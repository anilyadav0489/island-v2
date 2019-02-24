import React, {Component} from 'react';

class NavBar extends Component {
    openLinkedInProfile=()=>{
        window.open('https://www.linkedin.com/in/anil-yadav-53b67333/', "_blank");
    }
    openOldVersion=()=>{
        window.open('https://thawing-shore-18237.herokuapp.com/', "_blank");
    }
    updateScreenName=()=>{
        this.props.updateCurrentScreen('INSTRUCTIONS');
        console.log('instruct')
    }
    render() {
        return (
            <div className="navbar">
                <div className="navbar-left" onClick={this.updateScreenName}>
                    <div className="hamburger">
                        <div className="hamburger-strip"></div>
                        <div className="hamburger-strip"></div>
                        <div className="hamburger-strip"></div>
                    </div>
                    <div className="app-name" title="Version 2">Grab The Max</div>
                </div>
                <div className="navbar-right">
                    <div className="rules" onClick={this.updateScreenName}>Rules</div>
                    <div className="versions" title="Version 1" onClick={this.openOldVersion}>Old Version</div>
                    <div className="author" title='Anil Yadav' onClick={this.openLinkedInProfile}>About the author</div>
                </div>
            </div>
        );
    }
}

export default NavBar;