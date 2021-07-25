module.exports = {
    networks: {
        development: {
            gas : 4700000,
            gasPrice : 0,
            host: "127.0.0.1",
            // host: "104.208.39.174",
            port: 7545,
            network_id: "*" // Match any network id
        }
    },
    contracts_directory: './src/contracts/',
    contracts_build_directory : './src/abis/',
    compilers: {
        solc: {
            version: "^0.8.0"
        }
    }
};