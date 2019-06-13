/*
  Change the address of the issuer of new tokens.
*/

// Set NETWORK to either testnet or mainnet
const NETWORK = `testnet`

const WH = require("wormhole-sdk/lib/Wormhole").default

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

// Change this value to match your token.
const propertyId = 307

// The BCH address of the new issuer.
const newAddress = `bchtest:qp6hgvevf4gzz6l7pgcte3gaaud9km0l459fa23dul`

// Issue new tokens.
async function issueNewTokens() {
  try {
    const mnemonic = walletInfo.mnemonic

    // root seed buffer
    const rootSeed = Wormhole.Mnemonic.toSeed(mnemonic)

    // master HDNode
    if (NETWORK === `mainnet`)
      var masterHDNode = Wormhole.HDNode.fromSeed(rootSeed)
    else var masterHDNode = Wormhole.HDNode.fromSeed(rootSeed, "testnet")

    // HDNode of BIP44 account
    const account = Wormhole.HDNode.derivePath(masterHDNode, "m/44'/145'/0'")

    const change = Wormhole.HDNode.derivePath(account, "0/0")
    //const change2 = Wormhole.HDNode.derivePath(account, "0/1")

    // get the cash address
    const cashAddress = walletInfo.cashAddress

    // Create payload to change issuer
    const changeIssuer = await Wormhole.PayloadCreation.changeIssuer(propertyId)

    // Get a utxo to use for this transaction.
    const u = await Wormhole.Address.utxo([cashAddress])
    const utxo = findBiggestUtxo(u[0])

    // Create a rawTx using the largest utxo in the wallet.
    utxo.value = utxo.amount
    const rawTx = await Wormhole.RawTransactions.create([utxo], {})

    // Add the token information as an op-return code to the tx.
    const opReturn = await Wormhole.RawTransactions.opReturn(
      rawTx,
      changeIssuer
    )

    // add the address of the new issuer
    const ref = await Wormhole.RawTransactions.reference(opReturn, newAddress)

    // Generate a change output.
    const changeHex = await Wormhole.RawTransactions.change(
      ref, // Raw transaction we're working with.
      [utxo], // Previous utxo
      cashAddress, // Destination address.
      0.00001 // Miner fee.
    )

    const tx = Wormhole.Transaction.fromHex(changeHex)
    const tb = Wormhole.Transaction.fromTransaction(tx)

    // Finalize and sign transaction.
    const keyPair = Wormhole.HDNode.toKeyPair(change)
    let redeemScript
    tb.sign(0, keyPair, redeemScript, 0x01, utxo.satoshis)
    const builtTx = tb.build()
    const txHex = builtTx.toHex()
    //console.log(txHex);

    // sendRawTransaction to running BCH node
    const broadcast = await Wormhole.RawTransactions.sendRawTransaction(txHex)
    console.log(`Transaction ID: ${broadcast}`)
  } catch (err) {
    console.log(err)
  }
}
issueNewTokens()

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
