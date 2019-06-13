"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FindBiggestUtxo = require("./FindBiggestUtxo");

var _FindBiggestUtxo2 = _interopRequireDefault(_FindBiggestUtxo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChangeManagedTokenIssuer = function () {
  function ChangeManagedTokenIssuer(Wormhole) {
    _classCallCheck(this, ChangeManagedTokenIssuer);

    this.Wormhole = Wormhole;
  }

  _createClass(ChangeManagedTokenIssuer, [{
    key: "changeManagedTokenIssuer",
    value: async function changeManagedTokenIssuer(hdNode, propertyId, newAddress) {
      try {
        var cashAddress = this.Wormhole.HDNode.toCashAddress(hdNode);

        var changeIssuer = await this.Wormhole.PayloadCreation.changeIssuer(propertyId);

        // Get a utxo to use for this transaction.
        var u = await this.Wormhole.Address.utxo([cashAddress]);
        var utxo = new _FindBiggestUtxo2.default(u[0]);

        // Create a rawTx using the largest utxo in the wallet.
        utxo.value = utxo.amount;
        var rawTx = await this.Wormhole.RawTransactions.create([utxo], {});

        // Add the token information as an op-return code to the tx.
        var opReturn = await this.Wormhole.RawTransactions.opReturn(rawTx, changeIssuer);

        // add the address of the new issuer
        var ref = await this.Wormhole.RawTransactions.reference(opReturn, newAddress);

        // Generate a change output.
        var changeHex = await this.Wormhole.RawTransactions.change(ref, // Raw transaction we're working with.
        [utxo], // Previous utxo
        cashAddress, // Destination address.
        0.000005 // Miner fee.
        );

        var tx = this.Wormhole.Transaction.fromHex(changeHex);
        var tb = this.Wormhole.Transaction.fromTransaction(tx);

        // Finalize and sign transaction.
        var keyPair = this.Wormhole.HDNode.toKeyPair(hdNode);
        var redeemScript = void 0;
        tb.sign(0, keyPair, redeemScript, 0x01, utxo.satoshis);
        var builtTx = tb.build();
        var txHex = builtTx.toHex();

        // sendRawTransaction to running BCH node
        var broadcast = await this.Wormhole.RawTransactions.sendRawTransaction(txHex);
        var transaction = await this.Wormhole.DataRetrieval.transaction(broadcast);
        return transaction;
      } catch (error) {
        console.log(error.message);
      }
    }
  }]);

  return ChangeManagedTokenIssuer;
}();

exports.default = ChangeManagedTokenIssuer;