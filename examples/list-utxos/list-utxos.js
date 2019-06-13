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

    // Combine all the utxos into the inputs of the TX.
    const u = await Wormhole.Address.utxo([cashAddress])

    let i = 0
    u[0].forEach(utxo => {
      console.log(`utxo[${i}]: ${util.inspect(utxo)}`)
      i++

      console.log(` `)
    })
  } catch (err) {
    console.log(err)
  }
}
consolidateDust()
