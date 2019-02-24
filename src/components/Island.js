import React, {Component} from 'react';

class Island extends Component {
    initialValue = this.props.area;

    setIslandArea=(event)=>{
        if(isNaN(event.target.value)){
            this.props.updateArea(this.props.id, this.initialValue);    
        } else {
            this.initialValue = event.target.value;
            this.props.updateArea(this.props.id, +event.target.value);    
        }
        console.log(event.target.value);
    }
    onSelection=()=>{
        if(this.props.istate === 'SELECTABLE'){
            this.props.onIslandSelection(this.props.id);
        }
    }
    render() {
        let initialValue= this.props.area;
        let styleClass='island-area ' + this.props.istate;
        return (
            <div className="island" onClick={this.onSelection}>
                <input type="text" defaultValue={this.props.area} onChange={this.setIslandArea} className={styleClass}></input>
            </div>
        );
    }
}

export default Island;