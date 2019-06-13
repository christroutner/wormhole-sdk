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

async function listAllTokens() {
  try {
    const properties = await Wormhole.DataRetrieval.properties()
    console.log(properties)
    //console.table(properties)
  } catch (err) {
    console.error(`Error in getTokenInfo: `, err)
    throw err
  }
}
listAllTokens()
