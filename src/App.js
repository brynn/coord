import React, { Component } from 'react';
import './App.css';
import CountdownClock from './CountdownClock';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CountdownClock />
      </div>
    );
  }
}

export default App;
