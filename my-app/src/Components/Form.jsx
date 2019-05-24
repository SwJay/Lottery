import React, { Component } from 'react';
import getWeb3 from '../utils/getWeb3.js';
import LotteryContract from '../contracts/Lottery.json';
import '../App.css';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
          web3: '',
          num: '',
          time: [],
          lottery: [],
          state: []
        };
        this.Bet = this.Bet.bind(this);
        this.ShowByAddress = this.ShowByAddress.bind(this);
        this.handleNum = this.handleNum.bind(this);
    }

    componentDidMount(){
      getWeb3.then(results => {
        /*After getting web3, we save the informations of the web3 user by
        editing the state variables of the component */
        results.web3.eth.getAccounts( (error,acc) => {
          //this.setState is used to edit the state variables
          this.setState({
            web3: results.web3
          })
        });
        //At the end of the first promise, we return the loaded web3
        return results.web3
      }).catch( () => {
        //If no web3 provider was found, log it in the console
        console.log('Error finding web3.')
      })
    }

    Bet(){
      const contract = require('truffle-contract');
      const Lottery = contract(LotteryContract);
      const contracAddress = "0xa24fC97c77013705e42ac23FB2593C49236B94c4";
      Lottery.setProvider(this.state.web3.currentProvider);
      var LotteryInstance;
      this.state.web3.eth.getAccounts((error, accounts) => {
          Lottery.at(contracAddress).then((instance) => {
            LotteryInstance = instance
          }).then((result) => {
            // Get the value from the contract to prove it worked.
            return LotteryInstance.bet(this.state.num, {from: accounts[0],
            value: 1e17, gasLimit:7600027, gasPrice:5e9})
          }).catch(() => {
            console.log("Error with Lottery")
          })
        })
    }

    handleNum(e) {
      this.setState({num: e.target.value});
    }

    ShowByAddress(){
      const contract = require('truffle-contract');
      const Lottery = contract(LotteryContract);
      const contracAddress = "0xa24fC97c77013705e42ac23FB2593C49236B94c4";
      Lottery.setProvider(this.state.web3.currentProvider);
      var LotteryInstance;
      this.state.web3.eth.getAccounts((error, accounts) => {
        Lottery.at(contracAddress).then((instance) => {
          LotteryInstance = instance
        }).then((result) => {
          // Get the value from the contract to prove it worked.
          return LotteryInstance.showByAddress.call({from: accounts[0]})
        }).then((result) => {
          this.setState({
            time: result[0],
            lottery: result[1],
            state: result[2]
          })
          console.log(result[1]);
        })
      })
    }

    render(){
      const lotteries = []
      for (const i in this.state.time) {
        var state;
        switch(this.state.state[i].words[0]){
          case 0:
            state = "win!";
            break;
          case 1:
            state = "no prize";
            break;
          case 2:
            state = "pending";
            break;
        }
        lotteries.push(
          <div>
            <div className="App-list">time: {this.state.time[i].words[0]}</div>
            <div className="App-list">lottery: {this.state.lottery[i].words[0]}</div>
            <div className="App-list">state: {state}</div>
            <hr/>
          </div>
        )
      }

      return(
        <div>
          <h3 className="App-intro">BET NOW!</h3>
          <hr/>
          <h5 className="App-intro"> Bet on your lucky number:</h5>
          <div className="input-group">
                  <input type="number" className="form-control" onChange={this.handleNum}/>
          </div>
          <br/>
          <button onClick={this.Bet}>Bet</button>
          <br/>
          <hr/>
          <div>
            {lotteries}
          </div>
          <br/>
          <button onClick={this.ShowByAddress}>show my tickets</button>
          <br/>
        </div>
      )
    }
}

export default Form;