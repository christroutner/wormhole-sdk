/*
  Consolidate dust to clean up wallet.
*/

"use strict"

// Instantiate wormholecash
const WH = require("wormhole-sdk/lib/Wormhole").default
const Wormhole = new WH({
  restURL: `https://rest.bitcoin.com/v1/`
})

const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default
const BITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v1/" })

// Open the wallet generated with create-wallet.
let walletInfo
try {
  walletInfo = require(`../create-wallet/wallet.json`)
} catch (err) {
  console.log(
    `Could not open wallet.json. Generate a wallet with create-wallet first.
    Exiting.`
  )
  process.exit(0)
}

async function consolidateDust() {
  try {
    const mnemonic = walletInfo.mnemonic

    // root seed buffer
    const rootSeed = Wormhole.Mnemonic.toSeed(mnemonic)

    // master HDNode
    const masterHDNode = Wormhole.HDNode.fromSeed(rootSeed, "testnet")

    // HDNode of BIP44 account
    const account = Wormhole.HDNode.derivePath(masterHDNode, "m/44'/145'/0'")

    const change = Wormhole.HDNode.derivePath(account, "0/0")

    // get the cash address
    const cashAddress = Wormhole.HDNode.toCashAddress(change)
    // const cashAddress = walletInfo.cashAddress

    // instance of transaction builder
    const transactionBuilder = new BITBOX.TransactionBuilder("testnet")

    const u = await BITBOX.Address.utxo([cashAddress])
    const inputs = []
    const dust = 546
    u[0].forEach(utxo => {
      if (utxo.satoshis === dust) {
        inputs.push(utxo)

        // console.log(utxo.txid, utxo.vout)
        // add input with txid and index of vout
        transactionBuilder.addInput(utxo.txid, utxo.vout)
      }
    })

    // original amount of satoshis in vin
    const originalAmount = inputs.length * dust

    // get byte count to calculate fee. paying 1 sat/byte
    const byteCount = Wormhole.BitcoinCash.getByteCount(
      { P2PKH: inputs.length },
      { P2PKH: 1 }
    )

    // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
    const sendAmount = originalAmount - byteCount

    // add output w/ address and amount to send
    transactionBuilder.addOutput(cashAddress, sendAmount)

    // keypair
    const keyPair = Wormhole.HDNode.toKeyPair(change)

    // sign w/ HDNode
    let redeemScript
    inputs.forEach((input, index) => {
      transactionBuilder.sign(
        index,
        keyPair,
        redeemScript,
        transactionBuilder.hashTypes.SIGHASH_ALL,
        dust
      )
    })

    // build tx
    const tx = transactionBuilder.build()
    // output rawhex
    const hex = tx.toHex()

    // sendRawTransaction to running BCH node
    const broadcast = await BITBOX.RawTransactions.sendRawTransaction(hex)
    console.log(`Transaction ID: ${broadcast}`)
  } catch (err) {
    console.log(err)
  }
}
consolidateDust()
