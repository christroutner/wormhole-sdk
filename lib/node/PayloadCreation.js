"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var axios = require("axios");

var PayloadCreation = function () {
  function PayloadCreation(restURL) {
    _classCallCheck(this, PayloadCreation);

    this.restURL = restURL;
  }

  _createClass(PayloadCreation, [{
    key: "burnBCH",
    value: async function burnBCH() {
      try {
        var response = await axios.get(this.restURL + "payloadCreation/burnBCH");
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "changeIssuer",
    value: async function changeIssuer(propertyId) {
      try {
        var response = await axios.post(this.restURL + "payloadCreation/changeIssuer/" + propertyId);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "closeCrowdSale",
    value: async function closeCrowdSale(propertyId) {
      try {
        var response = await axios.post(this.restURL + "payloadCreation/closeCrowdSale/" + propertyId);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "grant",
    value: async function grant(propertyId, amount) {
      var memo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

      var path = void 0;
      if (memo !== "") {
        path = this.restURL + "payloadCreation/grant/" + propertyId + "/" + amount + "?memo=" + memo;
      } else {
        path = this.restURL + "payloadCreation/grant/" + propertyId + "/" + amount;
      }
      try {
        var response = await axios.post(path);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "crowdsale",
    value: async function crowdsale(ecosystem, propertyPrecision, previousId, category, subcategory, name, url, data, propertyIdDesired, tokensPerUnit, deadline, earlyBonus, undefine, totalNumber) {
      try {
        var response = await axios.post(this.restURL + "payloadCreation/crowdsale/" + ecosystem + "/" + propertyPrecision + "/" + previousId + "/" + category + "/" + subcategory + "/" + name + "/" + url + "/" + data + "/" + propertyIdDesired + "/" + tokensPerUnit + "/" + deadline + "/" + earlyBonus + "/" + undefine + "/" + totalNumber);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "fixed",
    value: async function fixed(ecosystem, propertyPrecision, previousId, category, subcategory, name, url, data, amount) {
      try {
        var response = await axios.post(this.restURL + "payloadCreation/fixed/" + ecosystem + "/" + propertyPrecision + "/" + previousId + "/" + category + "/" + subcategory + "/" + name + "/" + url + "/" + data + "/" + amount);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "managed",
    value: async function managed(ecosystem, propertyPrecision, previousId, category, subcategory, name, url, data) {
      try {
        var response = await axios.post(this.restURL + "payloadCreation/managed/" + ecosystem + "/" + propertyPrecision + "/" + previousId + "/" + category + "/" + subcategory + "/" + name + "/" + url + "/" + data);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "participateCrowdSale",
    value: async function participateCrowdSale(amount) {
      try {
        var response = await axios.post(this.restURL + "payloadCreation/participateCrowdSale/" + amount);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "revoke",
    value: async function revoke(propertyId, amount) {
      try {
        var response = await axios.post(this.restURL + "payloadCreation/revoke/" + propertyId + "/" + amount);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "simpleSend",
    value: async function simpleSend(propertyId, amount) {
      try {
        var response = await axios.post(this.restURL + "payloadCreation/simpleSend/" + propertyId + "/" + amount);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: "STO",
    value: async function STO(propertyId, amount) {
      var distributionProperty = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

      var path = void 0;
      if (distributionProperty !== undefined) {
        path = this.restURL + "payloadCreation/STO/" + propertyId + "/" + amount + "?distributionProperty=" + distributionProperty;
      } else {
        path = this.restURL + "payloadCreation/STO/" + propertyId + "/" + amount;
      }
      try {
        var response = await axios.post(path);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }]);

  return PayloadCreation;
}();

//export default PayloadCreation;


module.exports = PayloadCreation;