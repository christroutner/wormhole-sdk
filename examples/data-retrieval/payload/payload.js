/*
  Information about granted and revoked units of managed tokens.
*/

const WH = require("wormhole-sdk/lib/Wormhole").default
const Wormhole = new WH({ restURL: `v1/` })

async function payload() {
  try {
    const payload = await Wormhole.DataRetrieval.payload(
      "4023c994708bd0c471512e6b856e58c1567c34438cff3ea719bf534d2de18131"
    )

    console.log(JSON.stringify(payload, null, 2))
  } catch (error) {
    console.log(error)
  }
}
payload()
