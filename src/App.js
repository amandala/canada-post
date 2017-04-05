import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Search from './components/Search';
import AutoComplete from './components/AutoComplete';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App__header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="App__intro">Canada Post Address Complete API Example</h2>
        </div>
        <AutoComplete />
        <Search />
      </div>
    );
  }
}

export default App;
