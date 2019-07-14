# web3.js example usages

*Important notice: I'm using web3.js version `1.0.0-beta.55` and ethereumjs-tx version `1.3.7`. By default, ethereumjs-tx will be installed with the latest v2 version. However, if using the version 2.0, an extra parameter `chain` must be added for `Transcation` object in order to avoid the `{"code":-32000,"message":"invalid sender"` invalid sender error. [ref](https://github.com/ethereum/web3.js/issues/2915)*

*For simplicity purpose, I will NOT be using the latest ethereumjs-tx module. Make sure to install the module with command `$ npm install ethereumjs-tx@1.3.7` to avoid installing the latest v2 module.*

## Send Raw Transaction

### Notes

1. When exporting the private keys to be environment variables, make sure to remove `0x`. 

    `$ export PRIVATE_KEY="ABCDEEFG"` instead of `$ export PRIVATE_KEY="0xABCDEFG"`

2. When loading the private keys from env, be sure to specify the keys to be in hexadecimal values, otherwise an `private key length is invalid` error will show up.

    `const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')` instead of `const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1)`

## Interact with Smart Contract

### Notes

1. In order to success read data from smart contracts (either public function or public variables), make sure to use the callback promise **then()**. [ref](https://web3js.readthedocs.io/en/1.0/callbacks-promises-events.html)

    `contract.methods.isRevoke().call().then((result) => {console.log(result)});` instead of `contract.methods.isRevoke().call((err, status) => {console.log(status)});`

## How to get Transaction Status?

1. `getTransactionReceipt` [ref](https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt)

```javascript
> var tx_receipt;

> web3.eth.getTransactionReceipt("0x195a2d6b0aa9a54437bb598afa9f6884f18ea8c48e817d1e2a2c8784cfd0e843").then((res) => {tx_receipt = res})

> console.log(tx_receipt["status"])
true
```

2. *Event Listener*
https://ethereum.stackexchange.com/questions/56225/how-to-set-a-timer-in-web3-event-watcher?rq=1

3. Block number timestamp