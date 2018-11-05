import React, { Component } from 'react';

class Content extends Component {
    render() {
      return  <div className="App-form">
                <h1>One Bet</h1>
                Number: <input type="text" value={this.props.myDataProp} onChange={this.props.updateStateProp} />
                <div className="App-button">
                  <button type="submit" class="am-btn am-btn-primary am-round"> Bet! </button>
                </div>
              </div>
    }
  }

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 0};
        this.handleChange = this.handleChange.bind(this);
    }
   
    handleChange(event) {
      this.setState({value: event.target.value});
    }

    render() {
      var value = this.state.value;
      return <div>
              <Content myDataProp = {value} 
                updateStateProp = {this.handleChange}></Content>
             </div>;
    }
}

export default Form;