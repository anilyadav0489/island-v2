import React, {Component} from 'react'

class Rules extends Component {
    updateCurrentScreen=()=>{
        if(this.props.gameState === 'STARTING'){
            this.props.updateCurrentScreen('SELECTION');
        } else {
            this.props.updateCurrentScreen('GAME');
        }
    }
    render () {
        return (
            <div className='instructions'>
                <div className="instructions-text">
                    {`Welcome to the 'Grab The Max' game.`}
                </div>
                <div className="instructions-text">
                    {`In this game you will be given a set of islands with a 
                    specific land area. You need to grab islands with maximum area in 
                    order to win this game. Your opponent is the computer which
                    will be playing the game with same motive: Grab the max.
                    Alternate chances will be given to you and the computer to pick an island.
                    The only rule to be followed is:`}
                </div>
                <div className="instructions-text">
                    {`An Island can only be picked from the either the 
                    first or the last position amongst available islands.`}
                </div>
                
                <button onClick={this.updateCurrentScreen}>OK. Got it.</button>
            </div>
    
        );
        
    }
}

export default Rules;
