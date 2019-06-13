/*
  Information about granted and revoked units of managed tokens.
*/

const WH = require("wormhole-sdk/lib/Wormhole").default
const Wormhole = new WH({ restURL: `/v1/` })

async function grants() {
  try {
    const grants = await Wormhole.DataRetrieval.grants(191)

    console.log(JSON.stringify(grants, null, 2))
  } catch (error) {
    console.log(error)
  }
}
grants()
