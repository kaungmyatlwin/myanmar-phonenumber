Javascript module port (for browsers and node) of [mm_phonenumber](https://github.com/Melomap/mm_phonenumber) to check valid myanmar mobile numbers, get mobile operator's name, sanitize mobile numbers and get mobile network types.

Credit: [Original script (Python)](https://github.com/Melomap/mm_phonenumber)
Demo: [Web Demo](https://kaungmyatlwin.github.io/myanmar-phonenumber)

### Installation

If you have NPM installed,

`npm install myanmar-phonenumber --save`

Or if you're using for browser, [download](https://raw.githubusercontent.com/kaungmyatlwin/myanmar-phonenumber-js/master/myanmar.phonenumber.js) it and include in your document as shown below.

For CDN users, include the following URL.

`https://unpkg.com/myanmar-phonenumber`

### Usage

In browser
```javascript
// this is example script
<script src="path/to/myanmar.phonenumber.js"></script>
<script>
    console.log(myanmarPhoneNumber.normalizeInput('+၉၅၉၇၈၄၁၂၃၄၅၆')); // returns 09784123456
    console.log(myanmarPhoneNumber.normalizeInput('+959784123456')); // returns 09784123456
    console.log(myanmarPhoneNumber.getTelecomName('09978412345')); // returns Ooredoo
    console.log(myanmarPhoneNumber.getPhoneNetworkType('09978412345')); // returns GSM
    console.log(myanmarPhoneNumber.isValidMMPhoneNumber('09978412345')); // returns true if it meets Myanmar Phone Number conditions
</script>
```

In Node environment

```javascript
var myanmarPhoneNumber = require('/path/to/myanmar.phonenumber.js');
console.log(myanmarPhoneNumber.normalizeInput('+၉၅၉၇၈၄၁၂၃၄၅၆')); // returns 09784123456
console.log(myanmarPhoneNumber.normalizeInput('+959784123456')); // returns 09784123456
console.log(myanmarPhoneNumber.getTelecomName('09978412345')); // returns Ooredoo
console.log(myanmarPhoneNumber.getPhoneNetworkType('09978412345')); // returns GSM
console.log(myanmarPhoneNumber.isValidMMPhoneNumber('09978412345')); // returns true if it meets Myanmar Phone Number conditions
```
