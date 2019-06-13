"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
var BITBOX = new BITBOXSDK();

var ERC20 = function () {
  function ERC20(restURL, dataRetrieval, payloadCreation, rawTransactions) {
    _classCallCheck(this, ERC20);

    this.restURL = restURL;
    this.DataRetrieval = dataRetrieval;
    this.PayloadCreation = payloadCreation;
    this.RawTransactions = rawTransactions;
  }

  _createClass(ERC20, [{
    key: "config",
    value: function config(token) {
      var wallet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this.token = token;
      this.wallet = wallet;
    }
  }, {
    key: "totalSupply",
    value: async function totalSupply() {
      // Get the total token supply
      try {
        var response = await _axios2.default.get(this.restURL + "dataRetrieval/property/" + this.token.propertyid);
        return response.data.totaltokens;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "balanceOf",
    value: async function balanceOf(owner) {
      var _this = this;

      // Get the account balance of another account with address `owner`
      try {
        var response = await _axios2.default.get(this.restURL + "dataRetrieval/balancesForAddress/" + owner);
        var token = void 0;
        var tokens = response.data;
        tokens.forEach(function (tk, ind) {
          if (tk.propertyid === _this.token.propertyid) token = tk;
        });
        return token.balance;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "transfer",
    value: async function transfer(to, value, cb) {
      // Send `value` amount of tokens to address `to`
      try {
        var mnemonic = this.wallet.mnemonic;

        // root seed buffer
        var rootSeed = BITBOX.Mnemonic.toSeed(mnemonic);

        // master HDNode
        // let masterHDNode = BITBOX.HDNode.fromSeed(rootSeed, BITBOX.Address.detectAddressNetwork(to));
        var masterHDNode = BITBOX.HDNode.fromSeed(rootSeed, BITBOX.Address.detectAddressNetwork(to) === "mainnet" ? "bitcoincash" : "testnet");

        // HDNode of BIP44 account
        var account = BITBOX.HDNode.derivePath(masterHDNode, "m/44'/145'/0'");

        var change = BITBOX.HDNode.derivePath(account, "0/0");

        // get the cash address
        var cashAddress = BITBOX.HDNode.toCashAddress(change);

        // Create simple send payload.
        var payload = await this.PayloadCreation.simpleSend(this.token.propertyid, value);

        // Get a utxo to use for this transaction.
        var u = await BITBOX.Address.utxo([cashAddress]);
        var utxo = findBiggestUtxo(u[0]);

        // Create a rawTx using the largest utxo in the wallet.
        utxo.value = utxo.amount;
        var rawTx = await this.RawTransactions.create([utxo], {});

        // Add the token information as an op-return code to the tx.
        var opReturn = await this.RawTransactions.opReturn(rawTx, payload);

        // Set the destination/recieving address for the tokens, with the actual
        // amount of BCH set to a minimal amount.
        var ref = await this.RawTransactions.reference(opReturn, to);

        // Generate a change output.
        var changeHex = await this.RawTransactions.change(ref, // Raw transaction we're working with.
        [utxo], // Previous utxo
        cashAddress, // Destination address.
        0.00001 // Miner fee.
        );

        var tx = BITBOX.Transaction.fromHex(changeHex);
        var tb = BITBOX.Transaction.fromTransaction(tx);

        // Finalize and sign transaction.
        var keyPair = BITBOX.HDNode.toKeyPair(change);
        var redeemScript = void 0;
        tb.sign(0, keyPair, redeemScript, 0x01, utxo.satoshis);
        var builtTx = tb.build();
        var txHex = builtTx.toHex();

        // sendRawTransaction to running BCH node
        var broadcast = await BITBOX.RawTransactions.sendRawTransaction(txHex);
        console.log("Transaction ID: " + broadcast);
        cb(cashAddress, to, value);
        return true;
      } catch (error) {
        throw false;
      }
    }
  }, {
    key: "transferFrom",
    value: async function transferFrom(from, to, value, cb) {
      // Send `value` amount of tokens from address `from` to address `to`
      try {
        // get the cash address
        var cashAddress = BITBOX.HDNode.toCashAddress(from);

        // Create simple send payload.
        var payload = await this.PayloadCreation.simpleSend(this.token.propertyid, value);

        // Get a utxo to use for this transaction.
        var u = await BITBOX.Address.utxo([cashAddress]);
        var utxo = findBiggestUtxo(u[0]);

        // Create a rawTx using the largest utxo in the wallet.
        utxo.value = utxo.amount;
        var rawTx = await this.RawTransactions.create([utxo], {});

        // Add the token information as an op-return code to the tx.
        var opReturn = await this.RawTransactions.opReturn(rawTx, payload);

        // Set the destination/recieving address for the tokens, with the actual
        // amount of BCH set to a minimal amount.
        var ref = await this.RawTransactions.reference(opReturn, to);

        // Generate a change output.
        var changeHex = await this.RawTransactions.change(ref, // Raw transaction we're working with.
        [utxo], // Previous utxo
        cashAddress, // Destination address.
        0.00001 // Miner fee.
        );

        var tx = BITBOX.Transaction.fromHex(changeHex);
        var tb = BITBOX.Transaction.fromTransaction(tx);

        // Finalize and sign transaction.
        var keyPair = BITBOX.HDNode.toKeyPair(from);
        var redeemScript = void 0;
        tb.sign(0, keyPair, redeemScript, 0x01, utxo.satoshis);
        var builtTx = tb.build();
        var txHex = builtTx.toHex();

        // sendRawTransaction to running BCH node
        var broadcast = await BITBOX.RawTransactions.sendRawTransaction(txHex);
        console.log("Transaction ID: " + broadcast);
        cb(cashAddress, to, value);
        return true;
      } catch (error) {
        throw false;
      }
    }
  }, {
    key: "approve",
    value: async function approve(spender, value, cb) {
      // Allow `spender` to withdraw from your account, multiple times, up to the `value` amount. If this function is called again it overwrites the current allowance with `value`
      // NOOP
    }
  }, {
    key: "allowance",
    value: async function allowance(owner, spender, cb) {}
    // Returns the amount which `spender` is still allowed to withdraw from `owner`
    // NOOP


    // Transfer(address indexed _from, address indexed _to, uint256 _value). [Triggered when tokens are transferred.]
    // Approval(address indexed _owner, address indexed _spender, uint256 _value)[Triggered whenever approve(address _spender, uint256 _value) is called.]

  }]);

  return ERC20;
}();

exports.default = ERC20;

// SUPPORT/PRIVATE FUNCTIONS BELOW

// Returns the utxo with the biggest balance from an array of utxos.

function findBiggestUtxo(utxos) {
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
}