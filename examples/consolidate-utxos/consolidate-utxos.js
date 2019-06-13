/*
  Consolidate all UTXOs for an address into a single UTXO.
*/

// Inspect utility used for debugging.
const util = require("util")
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 1
}

// Set NETWORK to either testnet or mainnet
const NETWORK = `testnet`

const WH = require("../../lib/Wormhole").default

// Instantiate Wormhole based on the network.
let Wormhole
if (NETWORK === `mainnet`)
  Wormhole = new WH({ restURL: `https://rest.bitcoin.com/v1/` })
else Wormhole = new WH({ restURL: `https://trest.bitcoin.com/v1/` })

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
    if (NETWORK === `mainnet`)
      var masterHDNode = Wormhole.HDNode.fromSeed(rootSeed)
    else var masterHDNode = Wormhole.HDNode.fromSeed(rootSeed, "testnet") // Testnet

    // HDNode of BIP44 account
    const account = Wormhole.HDNode.derivePath(masterHDNode, "m/44'/145'/0'")

    const change = Wormhole.HDNode.derivePath(account, "0/0")

    // get the cash address
    const cashAddress = Wormhole.HDNode.toCashAddress(change)
    // const cashAddress = walletInfo.cashAddress

    // instance of transaction builder
    const transactionBuilder = new Wormhole.TransactionBuilder("testnet")

    // Combine all the utxos into the inputs of the TX.
    const u = await Wormhole.Address.utxo([cashAddress])
    const inputs = []
    let originalAmount = 0

    for (let i = 0; i < u[0].length; i++) {
      // REST API only supports 20 UTXOs at a time.
      if (i > 20) break

      const utxo = u[0][i]

      originalAmount = originalAmount + utxo.satoshis

      inputs.push(utxo)

      transactionBuilder.addInput(utxo.txid, utxo.vout)
    }

    // original amount of satoshis in vin
    //const originalAmount = inputs.length * dust
    console.log(`originalAmount: ${originalAmount}`)

    // get byte count to calculate fee. paying 1 sat/byte
    const byteCount = Wormhole.BitcoinCash.getByteCount(
      { P2PKH: inputs.length },
      { P2PKH: 1 }
    )
    console.log(`fee: ${byteCount}`)

    // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
    const sendAmount = originalAmount - byteCount
    console.log(`sendAmount: ${sendAmount}`)

    // add output w/ address and amount to send
    transactionBuilder.addOutput(cashAddress, sendAmount)

    // keypair
    const keyPair = Wormhole.HDNode.toKeyPair(change)

    // sign w/ HDNode
    let redeemScript
    inputs.forEach((input, index) => {
      //console.log(`inputs[${index}]: ${util.inspect(inputs[index])}`)
      transactionBuilder.sign(
        index,
        keyPair,
        redeemScript,
        transactionBuilder.hashTypes.SIGHASH_ALL,
        inputs[index].satoshis
      )
    })

    // build tx
    const tx = transactionBuilder.build()
    // output rawhex
    const hex = tx.toHex()

    console.log(`
You can review the output script for errors by replacing <tx-hex> with the TX
hex at this URL:
https://trest.bitcoin.com/v1/rawtransactions/decodeRawTransaction/<tx-hex>
      `)
    console.log(`TX Hex: ${hex}`)

    // sendRawTransaction to running BCH node
    const broadcast = await Wormhole.RawTransactions.sendRawTransaction(hex)
    console.log(`\nTransaction ID: ${broadcast}`)
  } catch (err) {
    console.log(err)
  }
}
consolidateDust()
