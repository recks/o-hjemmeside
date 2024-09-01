import React, { Component } from 'react';
import { Outlet } from "react-router-dom";
import './App.css';
import { defaultLoeb } from './Loeb';
import Menu from './Menu';
import Sponsors from './Sponsors';
import axios from 'axios';

async function getLoeb() {
  return await axios('config.json').then(res => {return res});
}

class App extends Component<{}, {}> {

  state = { loeb: defaultLoeb };

  componentDidMount() {
    getLoeb().then(res => {
      document.title = res.data.navn;
      this.setState({ loeb: res.data });
      var bodyStyles = document.body.style;
      bodyStyles.setProperty('--backgroundImg', "url(" + window.location.href + "/" + res.data.img + ")");
      //console.log("Style: " + bodyStyles.getPropertyValue("--backgroundImg"));
    });
  }

  render() {
    return (
      <div className="App">
        <Menu navn={this.state.loeb.navn} logo={this.state.loeb.logo} facebook={this.state.loeb.facebook} menu={this.state.loeb.menu} />
        <header className="App-header">
          <Outlet />
          <Sponsors sponsorList={this.state.loeb.sponsors} />
        </header>
      </div>
    );
  }
}

export default App;
