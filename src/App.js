import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { ConfigFactory, Maker, service } from '@makerdao/makerdao-exchange-integration';

class App extends Component {
  constructor(props) {
    super(props);

      this.state = {
        cdp: '',
        cdpId: '',
        maker: ''
      }
  }

  async componentDidMount() {
    // Use ConfigFactory and 'decentralized-oasis-without-proxies' preset to initialize a maker object:
    const maker = await new Maker(
      ConfigFactory.create('decentralized-oasis-without-proxies')
    );

    this.setState({ maker: maker });
    this.testMakerFunctionality();
  }

  async testMakerFunctionality() {
    await this.openCdp();
    this.getCdp();
    this.lockEth();
    this.getInfo();
    this.shutCdp();
  }
  
  async openCdp() {
    // Use the maker instance to call functions:
    const { maker } = this.state;
    const txn = await maker.openCdp()

    // Use transaction events to wait for events on the blockchain:
    const cdp = await txn.onMined()

    return this.setState({
      cdp: cdp,
      cdpId: await cdp.getCdpId()
    });
  }

  async getCdp() {
    const { maker, cdpId } = this.state;

    const newCdp = await maker.getCdp(cdpId);
    console.log(newCdp);
  }

  async lockEth() {
    const { cdp } = this.state;

    const txn = await cdp.lockEth('0.1');
    // console.log(txn);
  }

  async getInfo() {
    const { cdp } = this.state;

    const info = await cdp.getInfo();
    // console.log(info);
  }

  async shutCdp() {
    const { cdp, cdpId, maker } = this.state;

    const txn = await cdp.shut();
    // console.log(txn);
    txn.onMined();
    // console.log(await maker.getCdp(cdpId));
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
