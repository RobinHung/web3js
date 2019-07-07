# web3.js example usages

*Important notice: I'm using web3.js version `1.0.0-beta.55` and ethereumjs-tx version `1.3.7`. By default, ethereumjs-tx will be installed with the latest v2 version. However, if using the version 2.0, an extra parameter `chain` must be added for `Transcation` object in order to avoid the `{"code":-32000,"message":"invalid sender"` invalid sender error. [ref](https://github.com/ethereum/web3.js/issues/2915)*

*For simplicity purpose, I will NOT be using the latest ethereumjs-tx module. Make sure to install the module with command `$ npm install ethereumjs-tx@1.3.7` to avoid installing the latest v2 module.*

## Send Raw Transaction

### Notes

1. When exporting the private keys to be environment variables, make sure to remove `0x`. 

`$ export PRIVATE_KEY="ABCDEEFG"` instead of `$ export PRIVATE_KEY="0xABCDEFG"`

2. When loading the private keys from env, be sure to specify the keys to be in hexadecimal values, otherwise an `private key length is invalid` error will show up.

`const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')` instead of `const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1)`