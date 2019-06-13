/*
  Get the token information based on the primaryid value assigned to it.
*/

// Set NETWORK to either testnet or mainnet
const NETWORK = `testnet`

const WH = require("wormhole-sdk/lib/Wormhole").default

// Instantiate Wormhole based on the network.
let Wormhole
if (NETWORK === `mainnet`)
  Wormhole = new WH({ restURL: `https://rest.bitcoin.com/v1/` })
else Wormhole = new WH({ restURL: `https://trest.bitcoin.com/v1/` })

const propertyId = 307

async function getTokenInfo() {
  try {
    const retVal = await Wormhole.DataRetrieval.property(propertyId)

    console.log(
      `Info from token with propertyId of ${propertyId}: ${JSON.stringify(
        retVal,
        null,
        2
      )}`
    )
  } catch (err) {
    console.error(`Error in getTokenInfo: `, err)
    throw err
  }
}
getTokenInfo()
