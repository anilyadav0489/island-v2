import React, {Component} from 'react';
import Island from './Island';
import IslandCountSetter from './IslandCountSetter';

class Game extends Component {
    constructor(props){
        super(props);
        this.state={
            showInitialPopup: true,
            gameScreen: false,
            totalIslands: 0,
            leftPointer:0,
            rightPointer:0,
        }
        this.islandAreas = [];
        this.islandState = []; //selected, selectable, unselectable 
        this.message = 'Please select either of beating islands.'
    }
    showGameScreen=()=>{
        this.setState({
            gameScreen: true
        });
    }
    setTotalIslands=(count)=>{
        this.setState({
            totalIslands: count, 
            showInitialPopup:false, 
            gameScreen: true, 
            rightPointer: count-1,
        });
    }
    render () {
        let islands = [];
        for(let i=0; i<this.state.totalIslands; i++){
            this.islandAreas.push(parseInt(Math.random()*30 + 1));
            if(this.islandState[i] !== 'SELECTED'){
                if(i === this.state.leftPointer || i === this.state.rightPointer){
                    this.islandState.push('SELECTABLE');
                } else {
                    this.islandState.push('UNSELECTABLE');
                }
            }
            islands.push(<Island key={i} area={this.islandAreas[i]} istate={this.islandState[i]}/>);                
        }
        return (
            <div>
                {this.state.showInitialPopup ? <IslandCountSetter showGameScreen={this.showGameScreen} setTotalIslands={this.setTotalIslands}/> : null}
                {this.state.gameScreen ? (
                    <div className="play-area">
                        <div className="player-bucket">x{this.playerBucket}</div>
                        <div className="computer-bucket">y{this.computerBucket}</div>
                        <div className="islands">{islands}</div>
                        <input type='button' className="reset-button" value='Reset Values'></input>
                        <input type='button' className="restart-button" value='Restart Game'></input>
                        <div className="message">{this.message}</div>
                    </div>): null }
                {/** <img src={islandsBackgroundImage} alt="island background" className="bg-image"/>*/}
            </div>
        )
    }
}


export default Game;