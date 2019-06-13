import CheckBalance from "./Utility/CheckBalance"
import CreateManagedToken from "./Utility/CreateManagedToken"
import CreateFixedToken from "./Utility/CreateFixedToken"
import CreateCrowdSale from "./Utility/CreateCrowdSale"
import IssueManagedToken from "./Utility/IssueManagedToken"
import RevokeManagedToken from "./Utility/RevokeManagedToken"
import ChangeManagedTokenIssuer from "./Utility/ChangeManagedTokenIssuer"

class Utility {
  constructor(Wormhole) {
    this.restURL = Wormhole.restURL
    this.Wormhole = Wormhole
  }

  async checkBalance(address) {
    const checkBalance = new CheckBalance(this.Wormhole)

    try {
      const balance = await checkBalance.checkBalance(
        this.Wormhole.Address.toCashAddress(address)
      )
      return balance
    } catch (error) {
      if (error.message === "Address not found") console.log(`No tokens found.`)
    }
  }

  async createManagedToken(
    hdNode,
    ecosystem,
    precision,
    predecessor,
    category,
    subcategory,
    ticker,
    url,
    description
  ) {
    const createManagedToken = new CreateManagedToken(this.Wormhole)
    try {
      const managed = await createManagedToken.createManagedToken(
        hdNode,
        ecosystem,
        precision,
        predecessor,
        category,
        subcategory,
        ticker,
        url,
        description
      )
      return managed
    } catch (error) {
      console.log(error.message)
    }
  }

  async createFixedToken(
    hdNode,
    ecosystem,
    precision,
    predecessor,
    category,
    subcategory,
    ticker,
    url,
    description,
    amount
  ) {
    const createFixedToken = new CreateFixedToken(this.Wormhole)
    try {
      const fixed = await createFixedToken.createFixedToken(
        hdNode,
        ecosystem,
        precision,
        predecessor,
        category,
        subcategory,
        ticker,
        url,
        description,
        amount
      )
      return fixed
    } catch (error) {
      console.log(error.message)
    }
  }

  async createCrowdSale(
    hdNode,
    ecosystem,
    precision,
    predecessor,
    category,
    subcategory,
    ticker,
    url,
    description,
    identifier,
    tokensGranted,
    deadline,
    bonus,
    amount
  ) {
    const createCrowdSale = new CreateCrowdSale(this.Wormhole)
    try {
      const crowdsale = await createCrowdSale.createCrowdSale(
        hdNode,
        ecosystem,
        precision,
        predecessor,
        category,
        subcategory,
        ticker,
        url,
        description,
        identifier,
        tokensGranted,
        deadline,
        bonus,
        amount
      )
      return crowdsale
    } catch (error) {
      console.log(error.message)
    }
  }

  async issueManagedToken(hdNode, propertyId, tokenQuantity) {
    const issueManagedToken = new IssueManagedToken(this.Wormhole)
    try {
      const issue = await issueManagedToken.issueManagedToken(
        hdNode,
        propertyId,
        tokenQuantity
      )
      return issue
    } catch (error) {
      console.log(error.message)
    }
  }

  async revokeManagedToken(hdNode, propertyId, tokenQuantity) {
    const revokeManagedToken = new RevokeManagedToken(this.Wormhole)
    try {
      const revoke = await revokeManagedToken.revokeManagedToken(
        hdNode,
        propertyId,
        tokenQuantity
      )
      return revoke
    } catch (error) {
      console.log(error.message)
    }
  }

  async changeManagedTokenIssuer(hdNode, propertyId, newAddress) {
    const changeManagedTokenIssuer = new ChangeManagedTokenIssuer(this.Wormhole)
    try {
      const change = await changeManagedTokenIssuer.changeManagedTokenIssuer(
        hdNode,
        propertyId,
        newAddress
      )
      return change
    } catch (error) {
      console.log(error.message)
    }
  }
}

export default Utility
