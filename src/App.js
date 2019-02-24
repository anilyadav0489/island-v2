import React, { Component } from 'react';
import Game from './components/Game'
import NavBar from './components/NavBar'
import './custom-styles/App.scss';

class App extends Component {
  gameState = 'STARTING';
  state={currentScreen: 'INSTRUCTIONS'} 
  updateCurrentScreen=(screenName)=>{
    this.setState({
        currentScreen: screenName
    });
    console.log(screenName)
  }

  updateGameState=(newGameState)=>{
    this.gameState = newGameState;
  }

  render() {
    return (
      <div className="App">
        <NavBar updateCurrentScreen={this.updateCurrentScreen} gameState={this.gameState}/>
        <Game currentScreen={this.state.currentScreen} 
          updateGameState={this.updateGameState} 
          gameState={this.gameState}/>
      </div>
    );
  }
}

export default App;
