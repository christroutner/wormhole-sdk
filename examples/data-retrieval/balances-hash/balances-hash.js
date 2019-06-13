/*
  Returns a hash of the balances for the property.
*/

const WH = require("wormhole-sdk/lib/Wormhole").default
const Wormhole = new WH({ restURL: `/v1/` })

async function balancesHash() {
  try {
    const balancesHash = await Wormhole.DataRetrieval.balancesHash(191)

    console.log(JSON.stringify(balancesHash, null, 2))
  } catch (error) {
    console.log(error)
  }
}
balancesHash()
