import React, {Component} from 'react';

class Island extends Component {
    
    render() {
        let styleClass='island-area ' + this.props.istate;
        console.log(this.props.istate)
        return (
            <div className="island">
                <input type="text" value={this.props.area} className={styleClass}></input>
            </div>
        );
    }
}

export default Island;