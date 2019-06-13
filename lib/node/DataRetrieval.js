"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var axios = require("axios");

var DataRetrieval = function () {
  function DataRetrieval(restURL) {
    _classCallCheck(this, DataRetrieval);

    this.restURL = restURL;
  }

  _createClass(DataRetrieval, [{
    key: "balancesForAddress",
    value: async function balancesForAddress(address) {
      try {
        var response = await axios.get(this.restURL + "dataRetrieval/balancesForAddress/" + address);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "balancesForId",
    value: async function balancesForId(propertyId) {
      try {
        var response = await axios.get(this.restURL + "dataRetrieval/balancesForId/" + propertyId);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "balance",
    value: async function balance(address, propertyId) {
      try {
        var response = await axios.get(this.restURL + "dataRetrieval/balance/" + address + "/" + propertyId);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "balancesHash",
    value: async function balancesHash(propertyId) {
      try {
        var response = await axios.get(this.restURL + "dataRetrieval/balancesHash/" + propertyId);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "crowdSale",
    value: async function crowdSale(propertyId) {
      try {
        var response = await axios.get(this.restURL + "dataRetrieval/crowdSale/" + propertyId);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "currentConsensusHash",
    value: async function currentConsensusHash() {
      try {
        var response = await axios.get(this.restURL + "dataRetrieval/currentConsensusHash");
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "grants",
    value: async function grants(propertyId) {
      try {
        var response = await axios.get(this.restURL + "dataRetrieval/grants/" + propertyId);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "info",
    value: async function info() {
      try {
        var response = await axios.get(this.restURL + "dataRetrieval/info");
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "payload",
    value: async function payload(txid) {
      try {
        var response = await axios.get(this.restURL + "dataRetrieval/payload/" + txid);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "property",
    value: async function property(propertyId) {
      try {
        var response = await axios.get(this.restURL + "dataRetrieval/property/" + propertyId);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "seedBlocks",
    value: async function seedBlocks(startBlock, endBlock) {
      try {
        var response = await axios.get(this.restURL + "dataRetrieval/seedBlocks/" + startBlock + "/" + endBlock);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "STO",
    value: async function STO(txid, recipientFilter) {
      try {
        var response = await axios.get(this.restURL + "dataRetrieval/STO/" + txid + "/" + recipientFilter);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "transaction",
    value: async function transaction(txid) {
      try {
        var response = await axios.get(this.restURL + "dataRetrieval/transaction/" + txid);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "blockTransactions",
    value: async function blockTransactions(index) {
      try {
        var response = await axios.get(this.restURL + "dataRetrieval/blockTransactions/" + index);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "pendingTransactions",
    value: async function pendingTransactions(address) {
      var path = this.restURL + "dataRetrieval/pendingTransactions";
      if (address) {
        path = this.restURL + "dataRetrieval/pendingTransactions?address=" + address;
      }
      try {
        var response = await axios.get(path);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "properties",
    value: async function properties() {
      try {
        var response = await axios.get(this.restURL + "dataRetrieval/properties");
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "transactions",
    value: async function transactions() {
      try {
        var response = await axios.get(this.restURL + "dataRetrieval/transactions");
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }]);

  return DataRetrieval;
}();

//export default DataRetrieval;


module.exports = DataRetrieval;