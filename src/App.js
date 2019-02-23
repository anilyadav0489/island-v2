import React, { Component } from 'react';
import Game from './components/Game'
import NavBar from './components/NavBar'
import './custom-styles/App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Game/>
      </div>
    );
  }
}

export default App;
