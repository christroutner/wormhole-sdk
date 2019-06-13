"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CheckBalance = function () {
  function CheckBalance(Wormhole) {
    _classCallCheck(this, CheckBalance);

    this.Wormhole = Wormhole;
  }

  _createClass(CheckBalance, [{
    key: "checkBalance",
    value: async function checkBalance(address) {
      var finalBalance = {};
      var balance = await this.Wormhole.Address.details([address]);
      finalBalance.legacyAddress = this.Wormhole.Address.toLegacyAddress(address);
      finalBalance.cashAddress = this.Wormhole.Address.toCashAddress(address);
      finalBalance.bch = balance[0].balance;
      finalBalance.satoshis = balance[0].balanceSat;

      // get token balances
      try {
        var tokens = await this.Wormhole.DataRetrieval.balancesForAddress(address);
        finalBalance.tokens = tokens;
        return finalBalance;
      } catch (error) {
        if (error.message === "Address not found") console.log("No tokens found.");
      }
    }
  }]);

  return CheckBalance;
}();

exports.default = CheckBalance;