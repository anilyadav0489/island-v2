import React, {Component} from 'react';
import Island from './Island';
import IslandCountSetter from './IslandCountSetter';
import Rules from './Rules';
import {getTheIndex} from '../services/brain';

class Game extends Component {
    constructor(props){
        super(props);
        this.state={
            currentScreen: this.props.currentScreen, //GAME //SELECTION //INSTRUCTIONS
            totalIslands: 0,
            leftPointer:0,
            rightPointer:0,
            playerBucket:0,
            computerBucket:0,
            userTurn:true,
            resetButtonText: 'Reset Values'
        }
        this.gameState = this.props.gameState;
        this.showResetButton = true;
        this.islandAreas = [];
        this.islandState = []; //selected, selectable, unselectable 
        this.message = 'Your turn: \nPlease select either of beating islands.'
    }
    
    resetValues=()=>{
        if(this.state.resetButtonText === 'Done'){
            this.islandState = this.islandState.map(()=> 'UNSELECTABLE');
            this.islandState[0] = 'SELECTABLE'
            this.islandState[this.islandState.length - 1] = 'SELECTABLE'
            this.setState({resetButtonText: 'Reset Values'});
            this.message = 'Your turn: \nPlease select either of beating islands.'
        }
        else {
            this.islandState = this.islandState.map(()=> 'EDITING');
            this.setState({resetButtonText: 'Done'});
            this.message = 'Please hit "Done" button once all values are entered.'

        }
    }
    updateGameState=(updatedGameState)=>{
        this.props.updateGameState(updatedGameState);
    }
    restartGame=()=>{
        this.props.updateGameState('STARTING');
        this.setState({
            currentScreen: this.props.currentScreen,
            totalIslands: 0,
            leftPointer:0,
            rightPointer:0,
            playerBucket:0,
            computerBucket:0,
            userTurn:true
        });
        this.islandAreas = [];
        this.islandState = [];
        this.message = 'Your turn: \nPlease select either of beating islands.'
    }
    showGameScreen=()=>{
        this.setState({
            gameScreen: true
        });
    }
    setTotalIslands=(count)=>{
        this.setState({
            totalIslands: count, 
            currentScreen:'GAME', 
            rightPointer: count-1,
        });
    }
    updateCurrentScreen=(screenName)=>{
        this.setState({
            currentScreen: screenName
        });
        console.log(screenName)
    }

    onIslandSelection=(id)=>{
        let area = this.islandAreas[id];
        this.islandState[id] = 'SELECTED';
        this.showResetButton = false;
        if(this.state.userTurn){
            this.message="Computer's turn: \nThinking....."
            setTimeout(()=>{
                this.makeSelectionByComputer();
            },3000);
        
            if(id === this.state.leftPointer){
                this.setState((prevState)=>{
                    return {leftPointer: prevState.leftPointer + 1,
                            playerBucket: +prevState.playerBucket + parseInt(area), 
                            userTurn: false}
                });
            }else if(id === this.state.rightPointer){
                this.setState((prevState)=>{
                    return {rightPointer: prevState.rightPointer - 1,
                            playerBucket: +prevState.playerBucket + parseInt(area), 
                            userTurn: false}
                });
            }
        }
    }

    updateArea=(id, area)=>{
        this.islandAreas[id] = area;
    }

    makeSelectionByComputer=()=>{
        let id = getTheIndex(this.islandAreas.slice(this.state.leftPointer, this.state.rightPointer+1));
        this.islandState[id+this.state.leftPointer] = 'SELECTED';
        if(this.allIslandsSelected()){
            if(this.state.playerBucket > this.state.computerBucket){
                this.message="You won the game."
            } else if (this.state.playerBucket < this.state.computerBucket){
                this.message="You lose. Better luck next time."
            } else {
                this.message="Game drawn: \nYou played well though."
            }
        } else {
            this.message="Your turn: \nPlease select either of beating islands."
        }
        if(id === 0){
            this.setState((prevState)=>{
                return {leftPointer: prevState.leftPointer + 1,
                    computerBucket: +prevState.computerBucket + this.islandAreas[id + this.state.leftPointer], 
                        userTurn: true}
            });
        }else if((id + this.state.leftPointer) === this.state.rightPointer){
            this.setState((prevState)=>{
                return {rightPointer: prevState.rightPointer - 1,
                    computerBucket: +prevState.computerBucket + this.islandAreas[id + this.state.leftPointer], 
                    userTurn: true}
                });
        }
    }

    allIslandsSelected=()=>{
        let unselectedIslands = this.islandState.filter((island)=>{
            return island !== 'SELECTED';
        });
        return (unselectedIslands.length === 0);
    }

    render () {
        let islands = [];
        for(let i=0; i<this.state.totalIslands; i++){
            this.islandAreas.push(parseInt(Math.random()*30 + 1));
            if(this.islandState[i] === undefined){
                if(i === this.state.leftPointer || i === this.state.rightPointer){
                    this.islandState.push('SELECTABLE');
                } else {
                    this.islandState.push('UNSELECTABLE');
                }
            } else if(this.islandState[i] !== 'SELECTED' && this.islandState[i] !== 'EDITING'){
                if(i === this.state.leftPointer || i === this.state.rightPointer){
                    this.islandState[i] = 'SELECTABLE';
                } else {
                    this.islandState[i] = 'UNSELECTABLE';
                }
            }
            islands.push(<Island key={i} area={this.islandAreas[i]} id={i} updateArea={this.updateArea}
                istate={this.islandState[i]} onIslandSelection={this.onIslandSelection}/>);                
        }
        return (
            <div className="main-section"> 
                {this.state.currentScreen === 'INSTRUCTIONS' ? <Rules updateCurrentScreen={this.updateCurrentScreen} gameState={this.props.gameState}/> : null}
                {this.state.currentScreen === 'SELECTION' ? <IslandCountSetter updateGameState={this.updateGameState} showGameScreen={this.showGameScreen} setTotalIslands={this.setTotalIslands}/> : null}
                {this.state.currentScreen === 'GAME' ? (
                    <div className="play-area">
                        <div className="score-section">
                            <div className="score-top-section">
                                <div className="bucket-title-common">Area Grabbed by</div>
                            </div>
                            <div className="score-middle-section">
                                <div className="bucket-title-you">You</div>
                                <div className="bucket-title-computer">Computer</div>
                            </div>
                            <div className="score-bottom-section">
                                <div className="player-bucket">{this.state.playerBucket}</div>
                                <div className="computer-bucket">{this.state.computerBucket}</div>
                            </div>
                        </div>
                        <div className="island-section">
                            <div className="islands">{islands}</div>
                        </div>
                        <div className="message">{this.message}</div>
                        <div className="buttons-section">
                            {this.showResetButton ? (<input type='button' className="reset-button" 
                                value={this.state.resetButtonText} onClick={this.resetValues}></input>) : null}
                            <input type='button' className="restart-button" 
                                value='Restart Game' onClick={this.restartGame}></input>
                        </div>
                    </div>
                    ): null
                }
                        
            </div>
        )
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            currentScreen: nextProps.currentScreen
        });
    }
}



export default Game;