// Returns the utxo with the biggest balance from an array of utxos.
class FindBiggestUtxo {
  constructor(utxos) {
    let largestAmount = 0
    let largestIndex = 0

    for (let i = 0; i < utxos.length; i++) {
      const thisUtxo = utxos[i]

      if (thisUtxo.satoshis > largestAmount) {
        largestAmount = thisUtxo.satoshis
        largestIndex = i
      }
    }

    return utxos[largestIndex]
  }
}

export default FindBiggestUtxo
