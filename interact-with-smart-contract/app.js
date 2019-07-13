// TODO: read cert status, revoke cert and re-check cert status again
const keys = require("../config/keys")

const Tx = require("ethereumjs-tx")
const Web3 = require("web3")
const web3 = new Web3("https://ropsten.infura.io/" + keys.infura.ropsten_api_key)

const account1 = '0x6De84c79602B544Bed2a8e1611b830B93c084784'
const account2 = '0xA17884eb89141B41eb815986e26c450B5A8A84FF'

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex')

const contractAddress = "0x506B2CBc26e948931E81764E179f9004EeaFEE2D"
const contractABI = [{
    "constant": false,
    "inputs": [],
    "name": "revokeCertificate",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "rootCert",
    "outputs": [{
        "name": "",
        "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "serverCert",
    "outputs": [{
        "name": "",
        "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "isValid",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "csrFile",
    "outputs": [{
        "name": "",
        "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "file",
        "type": "string"
    }],
    "name": "uploadCSR",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "file",
        "type": "string"
    }],
    "name": "uploadCert",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "checkCertStatus",
    "outputs": [{
        "name": "",
        "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "name": "file",
        "type": "string"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
}]

const contract = new web3.eth.Contract(contractABI, contractAddress)

// Write data to the smart contract
web3.eth.getTransactionCount(account1, (err, txCount) => {

    const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(800000), // Raise the gas limit to a much higher amount
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        to: contractAddress,
        // data: contract.methods.transfer(account2, 1000).encodeABI()
        data: contract.methods.uploadCSR("test!").encodeABI()
    }

    const tx = new Tx(txObject)
    tx.sign(privateKey1)

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('err:', err, 'txHash:', txHash)
        // Use this txHash to find the contract on Etherscan!
    })
})

// Check the certificate status by calling the `checkCertStatus()` function
contract.methods.checkCertStatus().call().then((status) => {
    console.log(status)
})

// Read the uploaded CSR file
contract.methods.csrFile().call().then((result) => {
    console.log(result)
})