"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PayloadCreation = function () {
  function PayloadCreation(restURL) {
    _classCallCheck(this, PayloadCreation);

    this.restURL = restURL;
  }

  _createClass(PayloadCreation, [{
    key: "burnBCH",
    value: async function burnBCH() {
      try {
        var response = await _axios2.default.get(this.restURL + "payloadCreation/burnBCH");
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
      }
    }
  }, {
    key: "changeIssuer",
    value: async function changeIssuer(propertyId) {
      try {
        var response = await _axios2.default.post(this.restURL + "payloadCreation/changeIssuer/" + propertyId);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
      }
    }
  }, {
    key: "closeCrowdSale",
    value: async function closeCrowdSale(propertyId) {
      try {
        var response = await _axios2.default.post(this.restURL + "payloadCreation/closeCrowdSale/" + propertyId);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
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
        var response = await _axios2.default.post(path);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
      }
    }
  }, {
    key: "crowdsale",
    value: async function crowdsale(ecosystem, propertyPrecision, previousId, category, subcategory, name, url, data, propertyIdDesired, tokensPerUnit, deadline, earlyBonus, undefine, totalNumber) {
      try {
        var response = await _axios2.default.post(this.restURL + "payloadCreation/crowdsale/" + ecosystem + "/" + propertyPrecision + "/" + previousId + "/" + category + "/" + subcategory + "/" + name + "/" + url + "/" + data + "/" + propertyIdDesired + "/" + tokensPerUnit + "/" + deadline + "/" + earlyBonus + "/" + undefine + "/" + totalNumber);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
      }
    }
  }, {
    key: "fixed",
    value: async function fixed(ecosystem, propertyPrecision, previousId, category, subcategory, name, url, data, amount) {
      try {
        var response = await _axios2.default.post(this.restURL + "payloadCreation/fixed/" + ecosystem + "/" + propertyPrecision + "/" + previousId + "/" + category + "/" + subcategory + "/" + name + "/" + url + "/" + data + "/" + amount);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
      }
    }
  }, {
    key: "managed",
    value: async function managed(ecosystem, propertyPrecision, previousId, category, subcategory, name, url, data) {
      try {
        var response = await _axios2.default.post(this.restURL + "payloadCreation/managed/" + ecosystem + "/" + propertyPrecision + "/" + previousId + "/" + category + "/" + subcategory + "/" + name + "/" + url + "/" + data);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
      }
    }
  }, {
    key: "participateCrowdSale",
    value: async function participateCrowdSale(amount) {
      try {
        var response = await _axios2.default.post(this.restURL + "payloadCreation/participateCrowdSale/" + amount);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
      }
    }
  }, {
    key: "revoke",
    value: async function revoke(propertyId, amount) {
      try {
        var response = await _axios2.default.post(this.restURL + "payloadCreation/revoke/" + propertyId + "/" + amount);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
      }
    }
  }, {
    key: "simpleSend",
    value: async function simpleSend(propertyId, amount) {
      try {
        var response = await _axios2.default.post(this.restURL + "payloadCreation/simpleSend/" + propertyId + "/" + amount);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
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
        var response = await _axios2.default.post(path);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
      }
    }
  }, {
    key: "freeze",
    value: async function freeze(toAddress, propertyId) {
      var path = this.restURL + "payloadCreation/freeze/" + toAddress + "/" + propertyId;
      try {
        var response = await _axios2.default.post(path);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
      }
    }
  }, {
    key: "unfreeze",
    value: async function unfreeze(toAddress, propertyId) {
      var path = this.restURL + "payloadCreation/unfreeze/" + toAddress + "/" + propertyId;
      try {
        var response = await _axios2.default.post(path);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
      }
    }
  }, {
    key: "issueERC721Property",
    value: async function issueERC721Property(name, symbol, data, url, totalNumber) {
      var path = this.restURL + "payloadCreation/issueERC721Property/" + name + "/" + symbol + "/" + data + "/" + url + "/" + totalNumber;
      try {
        var response = await _axios2.default.post(path);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
      }
    }
  }, {
    key: "issueERC721Token",
    value: async function issueERC721Token(propertyId, tokenId, attributes, url) {
      var path = this.restURL + "payloadCreation/issueERC721Token/" + propertyId + "/" + tokenId + "/" + attributes + "/" + url;
      try {
        var response = await _axios2.default.post(path);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
      }
    }
  }, {
    key: "transferERC721Token",
    value: async function transferERC721Token(propertyId, tokenId) {
      var path = this.restURL + "payloadCreation/transferERC721Token/" + propertyId + "/" + tokenId;

      try {
        var response = await _axios2.default.post(path);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
      }
    }
  }, {
    key: "destroyERC721Token",
    value: async function destroyERC721Token(propertyId) {
      var tokenId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      var path = void 0;
      if (tokenId !== undefined) {
        path = this.restURL + "payloadCreation/destroyERC721Token/" + propertyId + "/" + tokenId;
      } else {
        path = this.restURL + "payloadCreation/destroyERC721Token/" + propertyId;
      }
      try {
        var response = await _axios2.default.post(path);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
      }
    }
  }]);

  return PayloadCreation;
}();

exports.default = PayloadCreation;