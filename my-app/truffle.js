/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

var WalletProvider = require("truffle-wallet-provider");
const Wallet = require('ethereumjs-wallet');
// var ropstenPrivateKey = new Buffer("063DB0C2D18DF840B31BAFBC871FA598C81F558244EF621C90955B05813A9163","hex");
// var ropstenWallet = Wallet.fromPrivateKey(ropstenPrivateKey);
// var ropstenProvider = new WalletProvider(ropstenWallet, "https://ropsten.infura.io/v3/ca26ad0352634c82948dca4688a4557b");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "5777" // Match any network id
    },
    // ropsten: {
    //   provider: ropstenProvider,
    //   gas: 4600000,
    //   network_id: 3
    // }
  }
};
