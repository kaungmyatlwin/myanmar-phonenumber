Javascript module port (for browsers and node) of [mm_phonenumber](https://github.com/Melomap/mm_phonenumber) to check valid myanmar mobile numbers, get mobile operator's name, sanitize mobile numbers and get mobile network types.

Credit: [Original script (Python)](https://github.com/Melomap/mm_phonenumber)

### Installation

If you have NPM installed,

`npm i myanmar-phonenumber`

Or if you're using for browser, [download](https://raw.githubusercontent.com/kaungmyatlwin/myanmar-phonenumber-js/master/myanmar.phonenumber.js) it and include in your document as shown below.

### Usage

In browser
```javascript
// this is example script
<script src="path/to/myanmar.phonenumber.js"></script>
<script>
    console.log(myanmarPhoneNumber.getTelecomName('09978412345')); // returns Ooredoo
    console.log(myanmarPhoneNumber.getPhoneNetworkType('09978412345')); // returns GSM
</script>
```

In Node environment

```javascript
var myanmarPhoneNumber = require('/path/to/myanmar.phonenumber.js');
console.log(myanmarPhoneNumber.getTelecomName('09978412345')); // returns Ooredoo
console.log(myanmarPhoneNumber.getPhoneNetworkType('09978412345')); // returns GSM
```