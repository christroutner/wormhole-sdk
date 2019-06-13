const NETWORK = `mainnet`

const WH = require("../../../lib/Wormhole").default

// Instantiate Wormhole based on the network.
let Wormhole
if (NETWORK === `mainnet`)
  Wormhole = new WH({ restURL: `https://rest.bitcoin.com/v1/` })
else Wormhole = new WH({ restURL: `https://trest.bitcoin.com/v1/` })

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

async function getERC721PropertyNews() {
  try {
    try {
      const ownerOfERC721Token = await Wormhole.DataRetrieval.ownerOfERC721Token(
        "0000000000000000000000000000000000000000000000000000000000000002",
        "0000000000000000000000000000000000000000000000000000000000000001",
        "qrhncn6hgkhljqg4fuq4px5qg74sjz9fqqj64s9la9"
      )

      console.log(JSON.stringify(ownerOfERC721Token, null, 2))
    } catch (error) {
      if (error.message === "Address not found") console.log(`No tokens found.`)
    }
  } catch (err) {
    console.error(`Error in getBalance: `, err)
    console.log(`Error message: ${err.message}`)
    throw err
  }
}
getERC721PropertyNews()
