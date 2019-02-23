import React, {Component, Suspense} from 'react';

const About = React.lazy(()=>{
    return import ('./components/About');
});

class HomePage extends Component {
    state={
        showAbout:false
    }
    loadComponent = ()=>{
        this.setState((prevState)=>{
            return {showAbout : !prevState.showAbout}
        });
    }
    render () {
        return (
        <div className="home-page">
            <input type="button" onClick={this.loadComponent} value="load Other"></input>
            {this.state.showAbout ? <div><span>About will be shown in a minute</span><Suspense fallback={<div>Loading....</div>}>
                <About/>                
            </Suspense></div>: <span>About is hidden</span> }
        </div>);
    }
}

export default HomePage;