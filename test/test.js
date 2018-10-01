var assert = require('assert');
var myanmarPhoneNumber = require('../myanmar-phonenumber.js');

describe('Sanitize input: ', function(){

  it('should strip white spaces from 09978412345', function () {
    assert.equal(myanmarPhoneNumber.sanitizeInput('  09978412345  '), '09978412345');
  });

  it('should remove spaces from 09 978 412 345', function(){
    assert.equal(myanmarPhoneNumber.sanitizeInput('09 978 412 345'), '09978412345');
  });

  it('should remove dashes from 09-978-412-34-5', function(){
    assert.equal(myanmarPhoneNumber.sanitizeInput('09-978-412-34-5'), '09978412345');
  });

  it('should remove double country code', function(){
    assert.equal(myanmarPhoneNumber.sanitizeInput('+95959978412345'), '+959978412345');
  });

  it('should remove zero before area code', function(){
    assert.equal(myanmarPhoneNumber.sanitizeInput('+9509978412345'), '+959978412345');
  });
});

describe('Valid Myanmar Phone: ', function(){
  it('should return true', function(){
    assert.equal(myanmarPhoneNumber.isValidMMPhoneNumber('09978412345'), true);
  });
  it('should return false', function(){
    assert.equal(myanmarPhoneNumber.isValidMMPhoneNumber('+14155552671'), false);
  });
});

describe('Operator names: ', function () {

  it('should return Ooredoo', function () {
    var opName = myanmarPhoneNumber.getTelecomName('09958412345');
    assert.equal(opName, 'Ooredoo');
  });

  it('should return Telenor', function () {
    var opName = myanmarPhoneNumber.getTelecomName('09784123456');
    assert.equal(opName, 'Telenor');
  });

  it('should return MPT', function () {
    var opName = myanmarPhoneNumber.getTelecomName('09420012345');
    assert.equal(opName, 'MPT');
  });

  it('should return MyTel', function () {
    var opName = myanmarPhoneNumber.getTelecomName('09690000966');
    assert.equal(opName, 'MyTel');
  });

  it('should return Unknown', function () {
    var opName = myanmarPhoneNumber.getTelecomName('0912345678');
    assert.equal(opName, 'Unknown');
  });

});

describe('Network types: ', function () {

  describe('GSM Networks: ', function() {
    it('should return GSM [Ooredoo]', function () {
      var ooredoo = myanmarPhoneNumber.getPhoneNetworkType('09978412345');
      assert.equal(ooredoo, 'GSM');
    });

    it('should return GSM [Telenor]', function () {
      var telenor = myanmarPhoneNumber.getPhoneNetworkType('09784123456');
      assert.equal(telenor, 'GSM');
    });

    it('should return GSM [MPT]', function () {
      var mpt = myanmarPhoneNumber.getPhoneNetworkType('09420012345');
      assert.equal(mpt, 'GSM');
    });

  });

  it('should return WCDMA', function() {
    var wcdma = myanmarPhoneNumber.getPhoneNetworkType('09451212123');
    assert.equal(wcdma, 'WCDMA');
  });

  it('should return CDMA 450 MHz', function () {
    var cdma400 = myanmarPhoneNumber.getPhoneNetworkType('096355555');
    assert.equal(cdma400, 'CDMA 450 MHz');
  });

  it('should return CDMA 800 MHz', function () {
    var cdma800 = myanmarPhoneNumber.getPhoneNetworkType('0973123456');
    assert.equal(cdma800, 'CDMA 800 MHz');
  });

  it('should return Unknown', function () {
    var unknown = myanmarPhoneNumber.getPhoneNetworkType('0912345678');
    assert.equal(unknown, 'Unknown');
  });

});