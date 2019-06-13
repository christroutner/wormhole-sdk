/*
  Returns a list of blocks containing Omni transactions for use in seed block filtering.
*/

const WH = require("wormhole-sdk/lib/Wormhole").default
const Wormhole = new WH({ restURL: `/v1/` })

async function seedBlocks() {
  try {
    const seedBlocks = await Wormhole.DataRetrieval.seedBlocks(290000, 300000)

    console.log(JSON.stringify(seedBlocks, null, 2))
  } catch (error) {
    console.log(error)
  }
}
seedBlocks()
