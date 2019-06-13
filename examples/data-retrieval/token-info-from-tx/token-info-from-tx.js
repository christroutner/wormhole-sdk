/*
  Get token information from a TXID
*/

// Set NETWORK to either testnet or mainnet
const NETWORK = `testnet`

// The TXID to check.
const TXID = "3b2e9747767cf3d0070ceaffbd60ae40f1cd46f04c8dac3617659073f324f19d"

const WH = require("../../../lib/Wormhole").default

// Instantiate Wormhole based on the network.
let Wormhole
if (NETWORK === `mainnet`)
  Wormhole = new WH({ restURL: `https://rest.bitcoin.com/v1/` })
else Wormhole = new WH({ restURL: `https://trest.bitcoin.com/v1/` })

// Get Token info from the TX.
async function getTxInfo() {
  const retVal = await Wormhole.DataRetrieval.transaction(TXID)

  console.log(`Info from TXID ${TXID}: ${JSON.stringify(retVal, null, 2)}`)
}
getTxInfo()
