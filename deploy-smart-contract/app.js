// TODO: deploy smart contract with constructor
const keys = require("../config/keys")

const Tx = require("ethereumjs-tx")
const Web3 = require("web3")
const web3 = new Web3("https://ropsten.infura.io/" + keys.infura.ropsten_api_key)

const account1 = '0x6De84c79602B544Bed2a8e1611b830B93c084784'
const account2 = '0xA17884eb89141B41eb815986e26c450B5A8A84FF'

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex')

web3.eth.getTransactionCount(account1, (err, txCount) => {
    // Smart Contract bytecode, got it from Remix
    const data = '0x60806040526000600260006101000a81548160ff02191690831515021790555034801561002b57600080fd5b5060405161077438038061077483398101806040528101908080518201929190505050806000908051906020019061006492919061006b565b5050610110565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100ac57805160ff19168380011785556100da565b828001600101855582156100da579182015b828111156100d95782518255916020019190600101906100be565b5b5090506100e791906100eb565b5090565b61010d91905b808211156101095760008160009055506001016100f1565b5090565b90565b6106558061011f6000396000f300608060405260043610610078576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806314e6047c1461007d5780637221e6fc146100ac578063abba5d9a1461013c578063c3225d921461016b578063cf2cafa0146101fb578063f376ed321461027c575b600080fd5b34801561008957600080fd5b5061009261030c565b604051808215151515815260200191505060405180910390f35b3480156100b857600080fd5b506100c161037c565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101015780820151818401526020810190506100e6565b50505050905090810190601f16801561012e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561014857600080fd5b5061015161041a565b604051808215151515815260200191505060405180910390f35b34801561017757600080fd5b5061018061042d565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101c05780820151818401526020810190506101a5565b50505050905090810190601f1680156101ed5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561020757600080fd5b50610262600480360381019080803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506104cb565b604051808215151515815260200191505060405180910390f35b34801561028857600080fd5b506102916104ed565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102d15780820151818401526020810190506102b6565b50505050905090810190601f1680156102fe5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60006001600260006101000a81548160ff0219169083151502179055506040805190810160405280600381526020017f585858000000000000000000000000000000000000000000000000000000000081525060009080519060200190610374929190610584565b506001905090565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104125780601f106103e757610100808354040283529160200191610412565b820191906000526020600020905b8154815290600101906020018083116103f557829003601f168201915b505050505081565b600260009054906101000a900460ff1681565b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104c35780601f10610498576101008083540402835291602001916104c3565b820191906000526020600020905b8154815290600101906020018083116104a657829003601f168201915b505050505081565b600081600190805190602001906104e3929190610584565b5060019050919050565b606060001515600260009054906101000a900460ff1615151415610548576040805190810160405280601581526020017f43657274696669636174652069732076616c69642100000000000000000000008152509050610581565b6040805190810160405280602081526020017f436572746966696361746520686173206265656e207265766f6b656421203a2881525090505b90565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106105c557805160ff19168380011785556105f3565b828001600101855582156105f3579182015b828111156105f25782518255916020019190600101906105d7565b5b5090506106009190610604565b5090565b61062691905b8082111561062257600081600090555060010161060a565b5090565b905600a165627a7a7230582051cebc41801353b873fe59567f89fa46cf3d693b6172b8e032daae9be1e7c84b0029'

    const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(1000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        data: data
    }

    const tx = new Tx(txObject)
    tx.sign(privateKey1)

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('err:', err, 'txHash:', txHash)
    })
})