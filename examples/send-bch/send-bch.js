/*
  Send BCH to RECV_ADDR.
*/

// Set NETWORK to either testnet or mainnet
const NETWORK = `testnet`
//const NETWORK = `mainnet`

// Replace the address below with the address you want to send the BCH to.
const RECV_ADDR = `bchtest:qqmd9unmhkpx4pkmr6fkrr8rm6y77vckjvqe8aey35`

// The amount of BCH to send, in satoshis. 1 satoshi = 0.00000001 BCH
const AMOUNT_TO_SEND = 10000

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
    `Could not open wallet.json. Generate a wallet with create-wallet first.`
  )
  process.exit(0)
}

const SEND_MNEMONIC = walletInfo.mnemonic

// Generate a change address from a Mnemonic of a private key.
const change = changeAddrFromMnemonic(SEND_MNEMONIC)
const SEND_ADDR = Wormhole.HDNode.toCashAddress(change)

async function sendBch() {
  const SEND_ADDR_LEGACY = Wormhole.Address.toLegacyAddress(SEND_ADDR)
  const RECV_ADDR_LEGACY = Wormhole.Address.toLegacyAddress(RECV_ADDR)

  const balance = await getBCHBalance(SEND_ADDR, false)
  console.log(`Send Address: ${SEND_ADDR}`)
  console.log(`Sender Legacy Address: ${SEND_ADDR_LEGACY}`)
  console.log(`Balance of sending address ${SEND_ADDR} is ${balance} BCH.`)

  if (balance <= 0.0) {
    console.log(`Balance of sending address is zero. Exiting.`)
    process.exit(0)
  }

  const balance2 = await getBCHBalance(RECV_ADDR, false)
  console.log(`\nReceiver Address: ${RECV_ADDR}`)
  console.log(`Receiver Legacy Address: ${RECV_ADDR_LEGACY}`)
  console.log(`Balance of recieving address ${RECV_ADDR} is ${balance2} BCH.\n`)

  const u = await Wormhole.Address.utxo([SEND_ADDR])
  const utxo = findBiggestUtxo(u[0])
  //console.log(`utxo: ${JSON.stringify(utxo, null, 2)}`)

  // instance of transaction builder
  if (NETWORK === `mainnet`)
    var transactionBuilder = new Wormhole.TransactionBuilder()
  else var transactionBuilder = new Wormhole.TransactionBuilder("testnet")

  const satoshisToSend = AMOUNT_TO_SEND
  const originalAmount = utxo.satoshis

  const vout = utxo.vout
  const txid = utxo.txid

  // add input with txid and index of vout
  transactionBuilder.addInput(txid, vout)

  // get byte count to calculate fee. paying 1 sat/byte
  const byteCount = Wormhole.BitcoinCash.getByteCount(
    { P2PKH: 1 },
    { P2PKH: 2 }
  )
  console.log(`byteCount: ${byteCount}`)
  const satoshisPerByte = 1.1
  const txFee = Math.floor(satoshisPerByte * byteCount)
  console.log(`txFee: ${txFee} satoshis\n`)

  // amount to send back to the sending address. It's the original amount - 1 sat/byte for tx size
  const remainder = originalAmount - satoshisToSend - txFee

  // add output w/ address and amount to send
  transactionBuilder.addOutput(RECV_ADDR, satoshisToSend)
  transactionBuilder.addOutput(
    Wormhole.Address.toLegacyAddress(SEND_ADDR),
    remainder
  )

  // Generate a keypair from the change address.
  const keyPair = Wormhole.HDNode.toKeyPair(change)

  // Sign the transaction with the HD node.
  let redeemScript
  transactionBuilder.sign(
    0,
    keyPair,
    redeemScript,
    transactionBuilder.hashTypes.SIGHASH_ALL,
    originalAmount
  )

  // build tx
  const tx = transactionBuilder.build()
  // output rawhex
  const hex = tx.toHex()
  console.log(`Transaction raw hex: `)
  console.log(hex)
  console.log(" ")

  // sendRawTransaction to running BCH node
  const broadcast = await Wormhole.RawTransactions.sendRawTransaction(hex)
  console.log(`Transaction ID: ${broadcast}`)
}
sendBch()

// Generate a change address from a Mnemonic of a private key.
function changeAddrFromMnemonic(mnemonic) {
  // root seed buffer
  const rootSeed = Wormhole.Mnemonic.toSeed(mnemonic)

  // master HDNode
  let masterHDNode
  if (NETWORK === "testnet")
    masterHDNode = Wormhole.HDNode.fromSeed(rootSeed, "testnet")
  else masterHDNode = Wormhole.HDNode.fromSeed(rootSeed)

  // HDNode of BIP44 account
  const account = Wormhole.HDNode.derivePath(masterHDNode, "m/44'/145'/0'")

  // derive the first external change address HDNode which is going to spend utxo
  const change = Wormhole.HDNode.derivePath(account, "0/0")

  return change
}

// Get the balance in BCH of a BCH address.
async function getBCHBalance(addr, verbose) {
  try {
    const result = await Wormhole.Address.details([addr])

    if (verbose) console.log(result)

    const bchBalance = result[0]

    return bchBalance.balance
  } catch (err) {
    console.error(`Error in getBCHBalance: `, err)
    console.log(`addr: ${addr}`)
    throw err
  }
}

// Returns the utxo with the biggest balance from an array of utxos.
function findBiggestUtxo(utxos) {
  let largestAmount = 0
  let largestIndex = 0

  for (var i = 0; i < utxos.length; i++) {
    const thisUtxo = utxos[i]

    if (thisUtxo.satoshis > largestAmount) {
      largestAmount = thisUtxo.satoshis
      largestIndex = i
    }
  }

  return utxos[largestIndex]
}
