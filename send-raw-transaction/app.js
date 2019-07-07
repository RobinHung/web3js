const keys = require("../config/keys")

const Tx = require("ethereumjs-tx")
const Web3 = require("web3")
const web3 = new Web3("https://ropsten.infura.io/" + keys.infura.ropsten_api_key)

// console.log(web3.eth.accounts.create())
// console.log(web3.eth.accounts.create())

const account1 = '0x6De84c79602B544Bed2a8e1611b830B93c084784'
const account2 = '0xA17884eb89141B41eb815986e26c450B5A8A84FF'

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex')

// console.log(privateKey1, privateKey2)

// web3.eth.getBalance(account1, (err, wei) => {
//     balance = web3.utils.fromWei(wei, 'ether')
//     console.log(balance)
// })

web3.eth.getTransactionCount(account1, (err, txCount) => {
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: account2,
        value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        // chainID: "0x03",
    }

    const tx = new Tx(txObject)
    tx.sign(privateKey1)

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        if (!err) {
            console.log('txHash:', txHash)
        }
        console.log(err)
    })

    // web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    //     .on('receipt', console.log);

    // console.log(web3.utils.toHex(txCount))
})