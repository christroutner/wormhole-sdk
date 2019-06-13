/*
  Check all token balances for a property ID
*/

const WH = require("wormhole-sdk/lib/Wormhole").default
const Wormhole = new WH({ restURL: `/v1/` })

async function getBalancesForId() {
  // get token balances
  try {
    const balances = await Wormhole.DataRetrieval.balancesForId(191)

    console.log(JSON.stringify(balances, null, 2))
  } catch (error) {
    if (error.message === "Address not found") console.log(`No tokens found.`)
  }
}
getBalancesForId()
