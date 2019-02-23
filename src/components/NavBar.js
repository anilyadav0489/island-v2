import React, {Component} from 'react';

class NavBar extends Component {
    showGameScreen=()=>{
        this.props.showGameScreen();
    }
    render() {
        return (
            <div className="navbar">
                <div className="navbar-left" onClick={this.showGameScreen}>
                    <div className="hamburger">
                        <div className="hamburger-strip"></div>
                        <div className="hamburger-strip"></div>
                        <div className="hamburger-strip"></div>
                    </div>
                    <div className="app-name" title="Version 2">Grab The Max</div>
                </div>
                <div className="navbar-right">
                    <div className="rules">Rules</div>
                    <div className="versions" title="Version 1">Old Version</div>
                    <div className="author" title='Anil Yadav'>About the author</div>
                </div>
            </div>
        );
    }
}

export default NavBar;