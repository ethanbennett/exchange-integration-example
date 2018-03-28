import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { ConfigFactory, Maker } from '@makerdao/makerdao-exchange-integration';

class App extends Component {
  componentDidMount() {
    console.log('ConfigFactory:', ConfigFactory);
    console.log('Maker:', Maker);

    // Use ConfigFactory and 'decentralized-oasis-without-proxies' preset to initialize a maker object:
    const maker = new Maker(
      ConfigFactory.create('decentralized-oasis-without-proxies')
    );

    this.openCdp(maker);

    // TODO: use returned CDP to call further functions, e.g. `cdp.shut()`
  }
  
  async openCdp(maker) {
    // Use the maker instance to call functions:
    const cdp = await maker.openCdp();
    console.log('CDP:', cdp);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Maker Exchange Integration</h1>
        </header>
        <p className="App-intro">
          Check the console to see the transaction from the opened CDP and the
          imported libraries.
        </p>
      </div>
    );
  }
}

export default App;
