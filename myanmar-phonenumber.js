// Node + Browser module pattern
// https://gist.github.com/CrocoDillon/9990078
(function (global) {
    'use strict';
    var myanmarPhoneNumber = {
      OPERATOR_REGEX: {
        ooredoo: /^(09|\+?959)9(5|7|6)\d{7}$/,
        telenor: /^(09|\+?959)7(9|8|7)\d{7}$/,
        mytel: /^(09|\+?959)6\d{8}$/,
        mpt: /^(09|\+?959)(5\d{6}|4\d{7,8}|2\d{6,8}|3\d{7,8}|6\d{6}|8\d{6}|7\d{7}|9(0|1|9)\d{5,6}|2[0-4]\d{5}|5[0-6]\d{5}|8[13-7]\d{5}|3[0-369]\d{6}|34\d{7}|4[1379]\d{6}|73\d{6}|91\d{6}|25\d{7}|26[0-5]\d{6}|40[0-4]\d{6}|42\d{7}|45\d{7}|89[6789]\d{6}|)$/
      },
      OPERATORS: {
        OOREDOO: 'Ooredoo',
        TELENOR: 'Telenor',
        MPT: 'MPT',
        MYTEL: 'MyTel',
        UNKNOWN: 'Unknown'
      },
      NETWORK_TYPE: {
        GSM: 'GSM',
        WCDMA: 'WCDMA',
        CDMA_450: 'CDMA 450 MHz',
        CDMA_800: 'CDMA 800 MHz',
        UNKNOWN: 'Unknown'
      }
    };

    myanmarPhoneNumber.sanitizeInput = function (phoneNumber) {
      if (phoneNumber) {
        phoneNumber = phoneNumber.trim();
        phoneNumber = phoneNumber.replace(/[- )(]/g,'')

        var countryCodeRe = /^\+?950?9\d+$/;

        if (countryCodeRe.test(phoneNumber)) {
          var doubleCountryCodeRe = /^\+?95950?9\d{7,9}$/;
          if (doubleCountryCodeRe.test(phoneNumber)) {
            phoneNumber = phoneNumber.replace(/9595/, '95');
          }
          var zeroBeforeAreaCodeRe = /^\+?9509\d{7,9}$/;
          if (zeroBeforeAreaCodeRe.test(phoneNumber)) {
            phoneNumber = phoneNumber.replace(/9509/, '959');
          }
        }
        return phoneNumber;
      }
    };

    myanmarPhoneNumber.isValidMMPhoneNumber = function (phoneNumber) {
      if (phoneNumber) {
        phoneNumber = this.sanitizeInput(phoneNumber);
        var myanmarPhoneRe = /^(09|\+?950?9|\+?95950?9)\d{7,9}$/;
        if (myanmarPhoneRe.test(phoneNumber)) return true;
      }
      return false;
    };

    myanmarPhoneNumber.getTelecomName = function (phoneNumber) {
      var operators = this.OPERATORS;
      var operatorRe = this.OPERATOR_REGEX;
      var operatorName = operators.UNKNOWN;

      if (phoneNumber && this.isValidMMPhoneNumber(phoneNumber)) {
        phoneNumber = this.sanitizeInput(phoneNumber);
        if (operatorRe.ooredoo.test(phoneNumber)) {
          operatorName = operators.OOREDOO;
        } else if (operatorRe.telenor.test(phoneNumber)) {
          operatorName = operators.TELENOR;
        } else if (operatorRe.mpt.test(phoneNumber)) {
          operatorName = operators.MPT;
        } else if (operatorRe.mytel.test(phoneNumber)) {
          operatorName = operators.MYTEL;
        } else {
          operatorName = operators.UNKNOWN;
        }
      }
      return operatorName;
    };

    myanmarPhoneNumber.getPhoneNetworkType = function (phoneNumber) {
      var networkType = this.NETWORK_TYPE.UNKNOWN;
      var operatorRe = this.OPERATOR_REGEX;


      if (phoneNumber && this.isValidMMPhoneNumber(phoneNumber)) {
        phoneNumber = this.sanitizeInput(phoneNumber);
        if (operatorRe.ooredoo.test(phoneNumber) || operatorRe.telenor.test(phoneNumber) || operatorRe.mytel.test(phoneNumber)) {
          networkType = this.NETWORK_TYPE.GSM;
        } else if (operatorRe.mpt.test(phoneNumber)) {
          var wcdmaRe = /^(09|\+?959)(55\d{5}|25[2-4]\d{6}|26\d{7}|4(4|5|6)\d{7})$/;
          var cdma450Re = /^(09|\+?959)(8\d{6}|6\d{6}|49\d{6})$/;
          var cdma800Re = /^(09|\+?959)(3\d{7}|73\d{6}|91\d{6})$/;

          if (wcdmaRe.test(phoneNumber)) {
            networkType = this.NETWORK_TYPE.WCDMA;
          } else if (cdma450Re.test(phoneNumber)) {
            networkType = this.NETWORK_TYPE.CDMA_450;
          } else if (cdma800Re.test(phoneNumber)) {
            networkType = this.NETWORK_TYPE.CDMA_800;
          } else {
            networkType = this.NETWORK_TYPE.GSM;
          }
        }
      }
    return networkType;
  };

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return myanmarPhoneNumber;
    });
  } else if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = myanmarPhoneNumber;
    }
    exports.myanmarPhoneNumber = myanmarPhoneNumber;
  } else {
    global.myanmarPhoneNumber = myanmarPhoneNumber;
  }

})(this);