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
    console.log('Maker object:', maker);
    await this.testMakerFunctionality();
  }

  async testMakerFunctionality() {
    await this.openCdp();
    await this.getCdp();
    await this.lockEth();
    await this.getInfo();
    await this.shutCdp();
    return;
}
  
  async openCdp() {
    // Use the maker instance to call functions:
    const { maker } = this.state;
    const txn = await maker.openCdp()

    // Use transaction events to wait for events on the blockchain:
    const cdp = await txn.onMined();
    const cdpId = await cdp.getCdpId();

    console.log('Opened CDP:', cdp);
    console.log('Opened CDP ID:', cdpId);

    this.setState({
      cdp: cdp,
      cdpId: cdpId
    });

    return;
  }

  async getCdp() {
    const { maker, cdpId } = this.state;

    const newCdp = await maker.getCdp(cdpId);
    console.log('Created CDP wrapper object (from ID):', newCdp);
    return;
  }

  async lockEth() {
    const { cdp } = this.state;

    const txn = await cdp.lockEth('0.1');
    console.log('Transaction from locking eth:', txn);
    await txn.onMined();
    return;
  }

  async getInfo() {
    const { cdp } = this.state;

    const info = await cdp.getInfo();
    console.log('Info fetched from new CDP:', info);
    return;
  }

  async shutCdp() {
    const { cdp } = this.state;

    const txn = await cdp.shut();
    console.log('Transaction from shutting the CDP:', txn);
    return;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Maker Exchange Integration</h1>
        </header>
          <br /><p className="App-intro"><strong>Check the console to see the following functionality:</strong></p><br />
          <p className="App-intro">Created Maker object</p>
          <p className="App-intro">Opened CDP</p>
          <p className="App-intro">Fetched CDP ID</p>
          <p className="App-intro">Created CDP wrapper with CDP ID</p>
          <p className="App-intro">Locked eth in CDP</p>
          <p className="App-intro">Fetched CDP info</p>
          <p className="App-intro">Shut CDP</p>
      </div>
    );
  }
}

export default App;
