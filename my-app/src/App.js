import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import getWeb3 from './utils/getWeb3.js';
import Form from './Components/Form.jsx';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      web3: '',
      address: '',
    };
  }

  componentDidMount() {
    getWeb3.then(results => {
      /*After getting web3, we save the informations of the web3 user by
      editing the state variables of the component */
      results.web3.eth.getAccounts( (error,acc) => {
        //this.setState is used to edit the state variables
        this.setState({
          address: acc[0],
          web3: results.web3
        })
      });
    }).catch( () => {
      //If no web3 provider was found, log it in the console
      console.log('Error finding web3.')
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" >
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Lottery Game</h1>
        </header>
        <div className="App-content">
          <Form className="App-form"/>
          <p className="App-intro">
            *bet 0.1 eth on any integer from 0 to 100.
          </p>
        </div>
      </div>
    );
  }
}

export default App;