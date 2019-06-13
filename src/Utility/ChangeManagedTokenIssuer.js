import FindBiggestUtxo from "./FindBiggestUtxo"
class ChangeManagedTokenIssuer {
  constructor(Wormhole) {
    this.Wormhole = Wormhole
  }

  async changeManagedTokenIssuer(hdNode, propertyId, newAddress) {
    try {
      const cashAddress = this.Wormhole.HDNode.toCashAddress(hdNode)

      const changeIssuer = await this.Wormhole.PayloadCreation.changeIssuer(
        propertyId
      )

      // Get a utxo to use for this transaction.
      const u = await this.Wormhole.Address.utxo([cashAddress])
      const utxo = new FindBiggestUtxo(u[0])

      // Create a rawTx using the largest utxo in the wallet.
      utxo.value = utxo.amount
      const rawTx = await this.Wormhole.RawTransactions.create([utxo], {})

      // Add the token information as an op-return code to the tx.
      const opReturn = await this.Wormhole.RawTransactions.opReturn(
        rawTx,
        changeIssuer
      )

      // add the address of the new issuer
      const ref = await this.Wormhole.RawTransactions.reference(
        opReturn,
        newAddress
      )

      // Generate a change output.
      const changeHex = await this.Wormhole.RawTransactions.change(
        ref, // Raw transaction we're working with.
        [utxo], // Previous utxo
        cashAddress, // Destination address.
        0.000005 // Miner fee.
      )

      const tx = this.Wormhole.Transaction.fromHex(changeHex)
      const tb = this.Wormhole.Transaction.fromTransaction(tx)

      // Finalize and sign transaction.
      const keyPair = this.Wormhole.HDNode.toKeyPair(hdNode)
      let redeemScript
      tb.sign(0, keyPair, redeemScript, 0x01, utxo.satoshis)
      const builtTx = tb.build()
      const txHex = builtTx.toHex()

      // sendRawTransaction to running BCH node
      const broadcast = await this.Wormhole.RawTransactions.sendRawTransaction(
        txHex
      )
      const transaction = await this.Wormhole.DataRetrieval.transaction(
        broadcast
      )
      return transaction
    } catch (error) {
      console.log(error.message)
    }
  }
}

export default ChangeManagedTokenIssuer
