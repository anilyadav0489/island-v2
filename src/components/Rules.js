import React, {Component} from 'react'

class Rules extends Component {
    render () {
        let instructions = "Welcome to the 'Pick the Best' game. " +
        "In this game you will play against computer " +
        "and one who picks larger islands will win the game. "+
        "Alternate chances will be given to you and the computer to pick an island."+
        "The only rule to be followed is:";
        return (
            <div>
            <div className='instructions application-top-level'>
                <div className="row">
                <div className="column small-centered-12 medium-12 large-12">
                    <div className="instructions-text application-top-level">
                    {instructions}
                    </div>
                    <div className="application-top-level instructions-text">
                    Island could be picked from the either the first or the last position amongst available islands.
                    </div>
                </div>
                </div>
                
                <div className="row">
                <div className="column small-centered-12 medium-12 large-12">
                    <div className="instructions-button">
                    <button className="button primary expanded" onClick={this.startTheGame.bind(this)}>OK. Got it.</button>
                    </div>
                </div>
                </div>
            </div>
            </div>
    
        );
        
    }
}

export default Rules;
