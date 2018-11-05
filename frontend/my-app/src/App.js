import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Components/Form';

class App extends Component {

  constructor(props){
    super(props);

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