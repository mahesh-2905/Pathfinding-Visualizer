import React, { Component } from 'react'
import './Node.css'
export default class Node extends Component {
    
    render() {
        const {
            row,
            col,
            isWall,
            isStart,
            isFinish,
            onMouseEnter,
            onMouseDown,
            onMouseUp,
        } = this.props;
        const extraClass = isWall?"Togglenode_wall":isStart?"node_start":isFinish?"node_finish":""
    // console.log(row,col)
        return (
            <div 
                id={`${row}+${col}`}  
                className={`node ${extraClass}`}
                onMouseEnter = {()=>{onMouseEnter(row,col)}}
                onMouseDown = {()=>{onMouseDown(row,col)}}
                onMouseUp = {()=>{onMouseUp(row,col)}}
            >
                
            </div>
        )
    }
}
