/*
  Check the BCH and Wormhole token balance for the wallet created with the
  create-wallet example app.
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

async function getTotalBalance() {
  try {
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

    // first get BCH balance
    const balance = await Wormhole.Address.details([cashAddress])

    console.log(`BCH Balance information:`)
    console.log(balance)
    console.log(``)
    console.log(`Wormhole Token information:`)

    // get token balances
    try {
      const tokens = await Wormhole.DataRetrieval.balancesForAddress(
        cashAddress
      )

      console.log(JSON.stringify(tokens, null, 2))
    } catch (error) {
      if (error.message === "Address not found") console.log(`No tokens found.`)
    }
  } catch (err) {
    console.error(`Error in getBalance: `, err)
    console.log(`Error message: ${err.message}`)
    throw err
  }
}
getTotalBalance()
