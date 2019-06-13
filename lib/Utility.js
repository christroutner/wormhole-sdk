"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CheckBalance = require("./Utility/CheckBalance");

var _CheckBalance2 = _interopRequireDefault(_CheckBalance);

var _CreateManagedToken = require("./Utility/CreateManagedToken");

var _CreateManagedToken2 = _interopRequireDefault(_CreateManagedToken);

var _CreateFixedToken = require("./Utility/CreateFixedToken");

var _CreateFixedToken2 = _interopRequireDefault(_CreateFixedToken);

var _CreateCrowdSale = require("./Utility/CreateCrowdSale");

var _CreateCrowdSale2 = _interopRequireDefault(_CreateCrowdSale);

var _IssueManagedToken = require("./Utility/IssueManagedToken");

var _IssueManagedToken2 = _interopRequireDefault(_IssueManagedToken);

var _RevokeManagedToken = require("./Utility/RevokeManagedToken");

var _RevokeManagedToken2 = _interopRequireDefault(_RevokeManagedToken);

var _ChangeManagedTokenIssuer = require("./Utility/ChangeManagedTokenIssuer");

var _ChangeManagedTokenIssuer2 = _interopRequireDefault(_ChangeManagedTokenIssuer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utility = function () {
  function Utility(Wormhole) {
    _classCallCheck(this, Utility);

    this.restURL = Wormhole.restURL;
    this.Wormhole = Wormhole;
  }

  _createClass(Utility, [{
    key: "checkBalance",
    value: async function checkBalance(address) {
      var checkBalance = new _CheckBalance2.default(this.Wormhole);

      try {
        var balance = await checkBalance.checkBalance(this.Wormhole.Address.toCashAddress(address));
        return balance;
      } catch (error) {
        if (error.message === "Address not found") console.log("No tokens found.");
      }
    }
  }, {
    key: "createManagedToken",
    value: async function createManagedToken(hdNode, ecosystem, precision, predecessor, category, subcategory, ticker, url, description) {
      var createManagedToken = new _CreateManagedToken2.default(this.Wormhole);
      try {
        var managed = await createManagedToken.createManagedToken(hdNode, ecosystem, precision, predecessor, category, subcategory, ticker, url, description);
        return managed;
      } catch (error) {
        console.log(error.message);
      }
    }
  }, {
    key: "createFixedToken",
    value: async function createFixedToken(hdNode, ecosystem, precision, predecessor, category, subcategory, ticker, url, description, amount) {
      var createFixedToken = new _CreateFixedToken2.default(this.Wormhole);
      try {
        var fixed = await createFixedToken.createFixedToken(hdNode, ecosystem, precision, predecessor, category, subcategory, ticker, url, description, amount);
        return fixed;
      } catch (error) {
        console.log(error.message);
      }
    }
  }, {
    key: "createCrowdSale",
    value: async function createCrowdSale(hdNode, ecosystem, precision, predecessor, category, subcategory, ticker, url, description, identifier, tokensGranted, deadline, bonus, amount) {
      var createCrowdSale = new _CreateCrowdSale2.default(this.Wormhole);
      try {
        var crowdsale = await createCrowdSale.createCrowdSale(hdNode, ecosystem, precision, predecessor, category, subcategory, ticker, url, description, identifier, tokensGranted, deadline, bonus, amount);
        return crowdsale;
      } catch (error) {
        console.log(error.message);
      }
    }
  }, {
    key: "issueManagedToken",
    value: async function issueManagedToken(hdNode, propertyId, tokenQuantity) {
      var issueManagedToken = new _IssueManagedToken2.default(this.Wormhole);
      try {
        var issue = await issueManagedToken.issueManagedToken(hdNode, propertyId, tokenQuantity);
        return issue;
      } catch (error) {
        console.log(error.message);
      }
    }
  }, {
    key: "revokeManagedToken",
    value: async function revokeManagedToken(hdNode, propertyId, tokenQuantity) {
      var revokeManagedToken = new _RevokeManagedToken2.default(this.Wormhole);
      try {
        var revoke = await revokeManagedToken.revokeManagedToken(hdNode, propertyId, tokenQuantity);
        return revoke;
      } catch (error) {
        console.log(error.message);
      }
    }
  }, {
    key: "changeManagedTokenIssuer",
    value: async function changeManagedTokenIssuer(hdNode, propertyId, newAddress) {
      var changeManagedTokenIssuer = new _ChangeManagedTokenIssuer2.default(this.Wormhole);
      try {
        var change = await changeManagedTokenIssuer.changeManagedTokenIssuer(hdNode, propertyId, newAddress);
        return change;
      } catch (error) {
        console.log(error.message);
      }
    }
  }]);

  return Utility;
}();

exports.default = Utility;