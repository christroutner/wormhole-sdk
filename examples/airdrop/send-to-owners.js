/*
  Token air-drop:
  Sends coins from the wallet (wallet.json) in the specified token to current
  owners of that token. Pulls from existing balance of tokens; it does not issue
  new tokens. This process also costs 1 satoshi per address/owner in WHC (not BCH).

  This is 'airdropping' additional quantities of a token to existing token holders
*/

const WH = require("wormhole-sdk/lib/Wormhole").default

// Set NETWORK to either testnet or mainnet
const NETWORK = `testnet`

// Change these values to match your token.
const propertyId = 307 // WH ID identifying the token.
const TOKEN_QTY = 33 // Number of tokens to send.

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

// Issue new tokens.
async function sendTokens() {
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

    // Create send to owners payload.
    const STO = await Wormhole.PayloadCreation.STO(propertyId, TOKEN_QTY)

    // Get a utxo to use for this transaction.
    const u = await Wormhole.Address.utxo([cashAddress])
    const utxo = findBiggestUtxo(u[0])

    // Create a rawTx using the largest utxo in the wallet.
    utxo.value = utxo.amount
    const rawTx = await Wormhole.RawTransactions.create([utxo], {})

    // Add the token information as an op-return code to the tx.
    const opReturn = await Wormhole.RawTransactions.opReturn(rawTx, STO)

    // Generate a change output.
    const changeHex = await Wormhole.RawTransactions.change(
      opReturn, // Raw transaction we're working with.
      [utxo], // Previous utxo
      cashAddress, // Destination address.
      0.000005 // Miner fee.
    )

    const tx = Wormhole.Transaction.fromHex(changeHex)
    const tb = Wormhole.Transaction.fromTransaction(tx)

    // Finalize and sign transaction.
    const keyPair = Wormhole.HDNode.toKeyPair(change)
    let redeemScript
    tb.sign(0, keyPair, redeemScript, 0x01, utxo.satoshis)
    const builtTx = tb.build()
    const txHex = builtTx.toHex()

    // sendRawTransaction to running BCH node
    const broadcast = await Wormhole.RawTransactions.sendRawTransaction(txHex)

    console.log(`You can monitor the below transaction ID on a block explorer.`)
    console.log(`Transaction ID: ${broadcast}`)
  } catch (err) {
    console.log(err)
  }
}
sendTokens()

// SUPPORT/PRIVATE FUNCTIONS BELOW

// Returns the utxo with the biggest balance from an array of utxos.
function findBiggestUtxo(utxos) {
  let largestAmount = 0
  let largestIndex = 0

  for (let i = 0; i < utxos.length; i++) {
    const thisUtxo = utxos[i]

    if (thisUtxo.satoshis > largestAmount) {
      largestAmount = thisUtxo.satoshis
      largestIndex = i
    }
  }

  return utxos[largestIndex]
}
