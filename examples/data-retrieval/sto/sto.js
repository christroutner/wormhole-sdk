/*
  Get information and recipients of a send-to-owners transaction.
*/

const WH = require("wormhole-sdk/lib/Wormhole").default
const Wormhole = new WH({ restURL: `/v1/` })

async function sto() {
  try {
    const sto = await Wormhole.DataRetrieval.STO(
      "4023c994708bd0c471512e6b856e58c1567c34438cff3ea719bf534d2de18131",
      "*"
    )

    console.log(JSON.stringify(sto, null, 2))
  } catch (error) {
    console.log(error)
  }
}
sto()
