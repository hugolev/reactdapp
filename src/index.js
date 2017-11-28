import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Web3 = require('web3');

class BalanceCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    this.getbalance();
  }

  render() {
    return (
      <td className="vCell" onClick={() => this.getbalance(this)}>
        {this.state.value}
      </td>
    );
  }

  getbalance() {
    var self = this;
    const web3 = new Web3('http://localhost:8545');
    var abi = JSON.parse('[{"constant":true,"inputs":[],"name":"minter","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"send","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Sent","type":"event"}]');
    var contract = new web3.eth.Contract(abi);
    contract.options.address = '0x8A3e08FE5e56737b3e753d5BAd90bfa2e165bBC9';
    contract.methods.balances('0x1b2213d105447bf653bd7126e6c82d7da02c846c').call({from: '0x461db4a9a56bd658f7b4ffe88d8126b9c573eb6f'}).then(function(bal){self.setbalance(bal)});
   }

   setbalance(bal) {
     this.setState({
       value: bal
     })
   }
}

class BalanceRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balances: Array(2).fill(0),
    };
  }

  renderBalanceCell(i) {
    return <BalanceCell value={i} />;
  }

  render() {
    return (
      <tr>
        <td>{this.props.value}</td>
        {this.renderBalanceCell(this.props.value)}
      </tr>
    );
  }
}

class BalanceTable extends React.Component {


  renderBalanceRow(i) {
    return <BalanceRow value={i} />;
  }

  render() {
    return (
      <table>
        {this.renderBalanceRow('0x1b2213d105447bf653bd7126e6c82d7da02c846c')}
      </table>
    );
  }
}

// ========================================

ReactDOM.render(
  <BalanceTable />,
  document.getElementById('root')
);
