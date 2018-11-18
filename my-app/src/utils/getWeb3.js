import Web3 from 'web3'

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion before loading web3, to be sure it's
  // already injected
  window.addEventListener('load', async() => {
    var results
    
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
          // Request account access if needed
          await window.ethereum.enable();
          results = {
            web3: window.web3
          }
          console.log('Injected ethereum web3 detected.');
          resolve(results)
          // Acccounts now exposed
      } catch (error) {
          // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      results = {
        web3: window.web3
      }
      console.log('Injected web3 detected.');
      resolve(results)
      // Acccounts always exposed
    }
    // Non-dapp browsers...
    else {
      var provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545')
      results = {
        web3: new Web3(provider)
      }
      console.log('No web3 instance injected, using Local web3.');
      resolve(results)
    }

  })
})
export default getWeb3