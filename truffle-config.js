var HDWalletProvider = require("truffle-hdwallet-provider");

require('dotenv').config()
var mnemonic = process.env["mnemonic"]
var tokenKey = process.env["tokenKey"]

module.exports = {
    networks: {
        development: {
            gas: 4700000,
            gasPrice: 0,
            host: "127.0.0.1",
            port: 7545,
            network_id: "*"
        },
        rinkeby: {
            provider: () => new HDWalletProvider(mnemonic, tokenKey),
            network_id: 4,
            gas: 4500000,
            gasPrice: 10000000000
        }
    },
    contracts_directory: './src/contracts/',
    contracts_build_directory: './src/abis/',
    compilers: {
        solc: {
            version: "^0.8.0"
        }
    }
};