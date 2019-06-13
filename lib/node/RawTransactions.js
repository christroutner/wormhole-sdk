"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var axios = require("axios");

var RawTransactions = function () {
  function RawTransactions(restURL, rawTransactions) {
    _classCallCheck(this, RawTransactions);

    this.restURL = restURL;
    this.decodeRawTransaction = rawTransactions.decodeRawTransaction;
    this.decodeScript = rawTransactions.decodeScript;
    this.getRawTransaction = rawTransactions.getRawTransaction;
    this.sendRawTransaction = rawTransactions.sendRawTransaction;
  }

  _createClass(RawTransactions, [{
    key: "change",
    value: async function change(rawtx, prevTxs, destination, fee) {
      var position = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;

      var path = void 0;
      if (position) {
        path = this.restURL + "rawTransactions/change/" + rawtx + "/" + JSON.stringify(prevTxs) + "/" + destination + "/" + fee + "?position=" + position;
      } else {
        path = this.restURL + "rawTransactions/change/" + rawtx + "/" + JSON.stringify(prevTxs) + "/" + destination + "/" + fee;
      }
      try {
        var response = await axios.post(path);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "input",
    value: async function input(rawtx, txid, n) {
      try {
        var response = await axios.post(this.restURL + "rawTransactions/input/" + rawtx + "/" + txid + "/" + n);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "opReturn",
    value: async function opReturn(rawtx, payload) {
      try {
        var response = await axios.post(this.restURL + "rawTransactions/opReturn/" + rawtx + "/" + payload);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "reference",
    value: async function reference(rawtx, destination, amount) {
      var path = void 0;
      if (amount) {
        path = this.restURL + "rawTransactions/reference/" + rawtx + "/" + destination + "?amount=" + amount;
      } else {
        path = this.restURL + "rawTransactions/reference/" + rawtx + "/" + destination;
      }
      try {
        var response = await axios.post(path);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "decodeTransaction",
    value: async function decodeTransaction(rawtx) {
      var prevTxs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

      var path = void 0;
      if (prevTxs) {
        path = this.restURL + "rawTransactions/decodeTransaction/" + rawtx + "?prevTxs=" + JSON.stringify(prevTxs);
      } else if (prevTxs && height) {
        path = this.restURL + "rawTransactions/decodeTransaction/" + rawtx + "?prevTxs=" + JSON.stringify(prevTxs) + "&height=" + height;
      } else if (height) {
        path = this.restURL + "rawTransactions/decodeTransaction/" + rawtx + "?height=" + height;
      } else {
        path = this.restURL + "rawTransactions/decodeTransaction/" + rawtx;
      }
      try {
        var response = await axios.get(path);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "create",
    value: async function create(inputs) {
      var outputs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      try {
        var response = await axios.post(this.restURL + "rawTransactions/create/" + JSON.stringify(inputs) + "/" + JSON.stringify(outputs));
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }]);

  return RawTransactions;
}();

//export default RawTransactions;


module.exports = RawTransactions;