"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Returns the utxo with the biggest balance from an array of utxos.
var FindBiggestUtxo = function FindBiggestUtxo(utxos) {
  _classCallCheck(this, FindBiggestUtxo);

  var largestAmount = 0;
  var largestIndex = 0;

  for (var i = 0; i < utxos.length; i++) {
    var thisUtxo = utxos[i];

    if (thisUtxo.satoshis > largestAmount) {
      largestAmount = thisUtxo.satoshis;
      largestIndex = i;
    }
  }

  return utxos[largestIndex];
};

exports.default = FindBiggestUtxo;