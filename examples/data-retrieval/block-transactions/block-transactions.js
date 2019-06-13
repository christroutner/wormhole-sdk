/*
  Lists all Wormhole transactions in a block.
*/

const WH = require("wormhole-sdk/lib/Wormhole").default
const Wormhole = new WH({ restURL: `/v1/` })

async function blockTransactions() {
  try {
    const blockTransactions = await Wormhole.DataRetrieval.blockTransactions(
      501234
    )

    console.log(JSON.stringify(blockTransactions, null, 2))
  } catch (error) {
    console.log(error)
  }
}
blockTransactions()
