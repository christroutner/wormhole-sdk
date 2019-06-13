"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
var DataRetrieval = require("./DataRetrieval");
var PayloadCreation = require("./PayloadCreation");
var RawTransactions = require("./RawTransactions");

var Wormhole = function (_BITBOXSDK) {
  _inherits(Wormhole, _BITBOXSDK);

  function Wormhole(config) {
    _classCallCheck(this, Wormhole);

    var _this = _possibleConstructorReturn(this, (Wormhole.__proto__ || Object.getPrototypeOf(Wormhole)).call(this, config));

    if (config && config.restURL && config.restURL !== "") {
      _this.restURL = config.restURL;
    } else {
      _this.restURL = "https://wormholerest.bitcoin.com/v1/";
    }

    _this.DataRetrieval = new DataRetrieval(_this.restURL);
    _this.PayloadCreation = new PayloadCreation(_this.restURL);
    _this.RawTransactions = new RawTransactions(_this.restURL, _this.RawTransactions);
    return _this;
  }

  return Wormhole;
}(BITBOXSDK);

module.exports = Wormhole;