/*
  The consensus hash for all balances for the current block.
*/

const WH = require("wormhole-sdk/lib/Wormhole").default
const Wormhole = new WH({ restURL: `/v1/` })

async function currentConsensusHash() {
  try {
    const currentConsensusHash = await Wormhole.DataRetrieval.currentConsensusHash()

    console.log(JSON.stringify(currentConsensusHash, null, 2))
  } catch (error) {
    console.log(error)
  }
}
currentConsensusHash()
