























import React, { Component } from 'react'
// import select from '../CustomSelect/customSelect'
import './Navbar.css'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state={
            mage:"Mage",
            algo:"none"
        }
    }
    handleChange(event){
        this.props.Maze(event.target.value) 
        // console.log(event.target.value)
    }
    visualize(){
        this.props.Visualize("hello")
    }
    render() {
        const{
            maze,
            algorithm
        } = this.props
        return (
            <React.Fragment>
                <div className="navbar">
                    <div className="navbar_wrapper">
                        <h5 className="mx-2 mt-3">Pathfinding visualizer</h5>
                        <div className="select_wrapper"> 
                            <FormControl id = "maze_form" className="mx-3" style={{width:"170px"}}>
                                <InputLabel id="demo-simple-select-label">Maze & Patterns</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                >
                                <MenuItem value={'rd'}>Recursive Division</MenuItem>
                                <MenuItem value={"rdh"}>Recursive Division (Horizontal skew)</MenuItem>
                                <MenuItem value={"rdv"}>Recursive Division (Vertical skew)</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl id = "maze_form" className="mx-3" style={{width:"170px"}}>
                                <InputLabel id="demo-simple-select-label">Algorithms</InputLabel>
                                <Select
                                // onChange={this.handleChange.bind(this)}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                >
                                <MenuItem value={'dijkstra'}>Dijkstra Algorithms</MenuItem>
                                <MenuItem value={"A*"}>A* Algorithm</MenuItem>
                                <MenuItem value={"dfs"}>Depth-first Search</MenuItem>
                                <MenuItem value={"bfs"}>Breadth-first Search</MenuItem>
                                </Select>
                            </FormControl>
                            <button onClick={this.visualize.bind(this)} className="btn btn-warning mt-2 mx-3">Visualize</button>
                            <button id = "clear_btn"className="mt-2 mx-5">Clear path</button>
                            <button id = "clear_btn" className="mt-2 mx-4">Clear board</button>

                            
                        </div>
                    </div>
                </div>

            </React.Fragment>
            
        )
    }
}
/* <select className="select algo_select mx-1">
                            <option className="option algo_option"value="Select Algorith">Select Algorithm</option>
                            <option className="option algo_option" value="dijkstra">Dijkstra's Algoritm</option>
                        </select> */
                        /* <select className="select maze_select mx-1">
                            <option className="option maze_option"value="Select Algorith">Maze & patterns</option>
                            <option className="option maze_option" value="dijkstra">Dijkstra's Algoritm</option>
                        </select> */