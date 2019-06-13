/*
  Returns a list of unconfirmed Wormhole transactions, pending in the memory pool.
*/

const WH = require("wormhole-sdk/lib/Wormhole").default
const Wormhole = new WH({ restURL: `/v1/` })

// Open the wallet generated with create-wallet.
let walletInfo
try {
  walletInfo = require(`../../create-wallet/wallet.json`)
} catch (err) {
  console.log(
    `Could not open wallet.json. Generate a wallet with create-wallet first.`
  )
  process.exit(0)
}

async function pendingTransactions() {
  const mnemonic = walletInfo.mnemonic

  // root seed buffer
  const rootSeed = Wormhole.Mnemonic.toSeed(mnemonic)

  // master HDNode
  const masterHDNode = Wormhole.HDNode.fromSeed(rootSeed, "bitcoincash")

  // HDNode of BIP44 account
  const account = Wormhole.HDNode.derivePath(masterHDNode, "m/44'/145'/0'")

  const change = Wormhole.HDNode.derivePath(account, "0/0")

  // get the cash address
  const cashAddress = Wormhole.HDNode.toCashAddress(change)
  try {
    const pendingTransactions = await Wormhole.DataRetrieval.pendingTransactions(
      cashAddress
    )

    console.log(JSON.stringify(pendingTransactions, null, 2))
  } catch (error) {
    console.log(error)
  }
}
pendingTransactions()
