const keys = require("../config/keys")

const Tx = require("ethereumjs-tx")
const Web3 = require("web3")
const web3 = new Web3("https://ropsten.infura.io/" + keys.infura.ropsten_api_key)