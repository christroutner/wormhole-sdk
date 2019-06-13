class CheckBalance {
  constructor(Wormhole) {
    this.Wormhole = Wormhole
  }

  async checkBalance(address) {
    const finalBalance = {}
    const balance = await this.Wormhole.Address.details([address])
    finalBalance.legacyAddress = this.Wormhole.Address.toLegacyAddress(address)
    finalBalance.cashAddress = this.Wormhole.Address.toCashAddress(address)
    finalBalance.bch = balance[0].balance
    finalBalance.satoshis = balance[0].balanceSat

    // get token balances
    try {
      const tokens = await this.Wormhole.DataRetrieval.balancesForAddress(
        address
      )
      finalBalance.tokens = tokens
      return finalBalance
    } catch (error) {
      if (error.message === "Address not found") console.log(`No tokens found.`)
    }
  }
}

export default CheckBalance
