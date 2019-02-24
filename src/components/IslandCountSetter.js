import React, {Component} from 'react';

class IslandCountSetter extends Component {
    constructor(props){
        super(props);
        this.state={
            show:true,
        }
    }

    setTotalIslands=(count)=>{
        setTimeout(()=>{
            this.props.updateGameState('RUNNING');
            this.props.setTotalIslands(count);
        }, 400);
    }
    render() {
        return ( 
        <div className="popup">
            <div className="popup-header">{`Select Islands`}</div>
            <div className="popup-body">
                <div className="body-text">Select the number of islands you want to begin with.</div>
                <div className="button-section">
                    <button className="div-circle" onClick={()=>this.setTotalIslands(2)}>2</button>
                    <button className="div-circle" onClick={()=>this.setTotalIslands(4)}>4</button>
                    <button className="div-circle" onClick={()=>this.setTotalIslands(6)}>6</button>
                    <button className="div-circle" onClick={()=>this.setTotalIslands(8)}>8</button>
                    <button className="div-circle" onClick={()=>this.setTotalIslands(10)}>10</button>
                </div>
            </div>
        </div>
        )
    }
}

export default IslandCountSetter;