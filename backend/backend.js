const MyContract = require('./lottery.json');
const web3 = require('web3');
// const express = require('express');
// const Tx = require('ethereumjs-tx');

// const app = express();

// Infura HttpProvider Endpoint
web3js = new web3(new web3.providers.HttpProvider(""));

setInterval(function(req,res){

    var myAddress = "";
    var privateKey = "";
    //contract abi is the array that you can get from the ethereum wallet or etherscan
    var contractABI = MyContract;
    var contractAddress ="0xa24fC97c77013705e42ac23FB2593C49236B94c4";
    
    //creating contract object
    var contract = new web3js.eth.Contract(contractABI,contractAddress);

    let tx_builder = contract.methods.draw();
    let encoded_tx = tx_builder.encodeABI();
    //let chainId = web3js.utils.toHex(3);
    let value = web3js.utils.toHex(0);
    //let gas = web3js.utils.toHex(120000);
    let gasPrice = web3js.utils.toHex(5e9);
    let gasLimit = web3js.utils.toHex(2000000);
    // let nonce = web3js.eth.getTransactionCount(myAddress);
    let transactionObject = {
        chainId: 3,
        from: myAddress,
        to: contractAddress,
        value: value,
        data: encoded_tx,
        //gas: gas,
        gasPrice: gasPrice,
        gasLimit: gasLimit
        //nonce: web3js.utils.toHex(nonce)
    };
    console.log(transactionObject);
    web3js.eth.accounts.signTransaction(transactionObject, privateKey).then(signed => {
        var tran = web3js.eth.sendSignedTransaction(signed.rawTransaction);

        tran.on('confirmation', (confirmationNumber, receipt) => {
        console.log('confirmation: ' + confirmationNumber);
        });

        tran.on('transactionHash', hash => {
        console.log('hash');
        console.log(hash);
        });

        tran.on('receipt', receipt => {
        console.log('reciept');
        console.log(receipt);
        });

        tran.on('error', console.error);
    })
}, 3600000);
