import React, { Component } from 'react'
import './PathFindingVisualizer.css'
import Node from '../Node/Node'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import './PathFindingVisualizer.css'
// import NumericInput from 'react-input';
import RecurssiveDivisionMaze from '../Mages/RecurssiveDivisionMaze'
import Maze1 from '../Mages/Maze1'
import Maze2 from '../Mages/Maze2'
import RandomMaze from '../Mages/RandomMaze'
import { DijkstraAlgo , shortestPath } from '../Algorithms/DijkstraAlgo'
import { AstarAlgorithm , shortestPathAstar } from '../Algorithms/AstarAlgo'
import { DepthFirstSearch ,DfsPath} from '../Algorithms/DepthFirstSearch'
import {BreadthFirstSearch ,BfsPath} from '../Algorithms/BreadthFirstSearch'
import DijkstraAlgoAnimation  from '../Animations/AlgorithmsAnimations/DijkstraAlgoAnimation'
import DfsAlgoAnimation from '../Animations/AlgorithmsAnimations/DfsAlgoAnimation'
import { ClearPath } from '../Animations/ClearPath';
import ToggledWallAnimation from '../Animations/ToggleWallAnimate'
import RecursiveDivisionMazeAnimation ,{RecurssiveDivisionMazeState} from '../Animations/RecursiveDivisionMazeAnimation'
import RandomMazeAnimation ,{RandomMazeAnimationState} from '../Animations/RandomMazeAnimation'
import ClearAnimation from '../Animations/ClearAnimation'

export default class PathFindingVisualizer extends Component {

    constructor(props) {

        super(props)
        this.state = {
            grid : [],
            row : 21,
            col : 55,
            start:[3,5],
            finish:[10 ,30],
            width: 0,
            height:0,
            mousePress: false,
            algo:''
        }
    }
    createNode(row,col){
        return {
            row:row,
            col:col,
            isWall:false,
            isWallAnimate:false,
            isStart: row === this.state.start[0] && col === this.state.start[1]?true:false,
            isFinish: row === this.state.finish[0] && col === this.state.finish[1]?true:false,
            distance:Infinity,
            gValue:Infinity,
            fValue:Infinity,
            previousNode: null,
            isVisited:false,
            algo:'none',
            maze:'none'
        };
    }
    GenerateGrid(){
        let nodes = []
        const row = this.state.row
        const col = this.state.col
        for(let i=0 ; i< row;i++){
            let currRow = []
            for(let j=0; j<col ;j++){
                currRow.push(this.createNode(i,j))
            }
            nodes.push(currRow)
        }
        this.setState({grid:nodes})

    }
    handleonMouseEnter(row,col){
        if(!this.state.mousePress){
            return
        }
        this.setState({grid:ToggledWallAnimation(this.state.grid,row,col,this.state.start,this.state.finish)})
    }
    handleMouseDown(row,col){
        this.setState({mousePress:true,grid:ToggledWallAnimation(this.state.grid,row,col,this.state.start,this.state.finish)})
    }
    handleMouseUp(row,col){
        console.log("Mouse upped")
        this.setState({mousePress:false})
    }
    handleStartRow(event){
        const value = parseInt(event.target.value)
        this.setState({start:[value,this.state.start[1]]})
        setTimeout(()=>{
            this.GenerateGrid()
            console.log(this.state.start)
        },10)
    }
    handleStartCol(event){
        const value = parseInt(event.target.value)
        this.setState({start:[this.state.start[0],value]})
        setTimeout(()=>{
            this.GenerateGrid()
        },10)
    }
    handleFinishRow(event){
        const value = parseInt(event.target.value)
        this.setState({finish:[value,this.state.finish[1]]})
        setTimeout(()=>{
            this.GenerateGrid()
        },10)
    }
    handleFinishCol(event){
        const value = parseInt(event.target.value)
        this.setState({finish:[this.state.start[0],value]})
        setTimeout(()=>{
            this.GenerateGrid()
        },10)
    }
    handleMaze(event){
        const mazeType = event.target.value
        if(mazeType === 'rdm'){
            this.randomMaze()
        }
        else if(mazeType === 'recd'){
            this.clearBoard()
            const orientation = Math.floor(Math.random()*2) ?"Horizontal":"Vertical"
            const animations = RecurssiveDivisionMaze(2,this.state.row-3,2,this.state.col-3,orientation)
            setTimeout(()=>{ 
                RecursiveDivisionMazeAnimation(this.state.grid,this.state.start,this.state.finish,animations,this.state.row,this.state.col,3)
            },10)
            setTimeout(()=>{
                this.setState({grid:RecurssiveDivisionMazeState(this.state.grid,this.state.start,this.state.finish,animations,this.state.row,this.state.col)})
            },13000)
        }
        else if(mazeType === 'recdh'){
            this.clearBoard()
            const animations = Maze2(2,this.state.row-3,2,this.state.col-3,"Horizontal")
            setTimeout(()=>{ 
                RecursiveDivisionMazeAnimation(this.state.grid,this.state.start,this.state.finish,animations,this.state.row,this.state.col,3)
            },10)
            setTimeout(()=>{
                this.setState({grid:RecurssiveDivisionMazeState(this.state.grid,this.state.start,this.state.finish,animations,this.state.row,this.state.col)})
            },6700)
        }
        else{
            this.clearBoard()
            const animations = Maze1(2,this.state.row-3,2,this.state.col-3,"Vertical")
            setTimeout(()=>{ 
                RecursiveDivisionMazeAnimation(this.state.grid,this.state.start,this.state.finish,animations,this.state.row,this.state.col,3)
            },10)
            setTimeout(()=>{
                this.setState({grid:RecurssiveDivisionMazeState(this.state.grid,this.state.start,this.state.finish,animations,this.state.row,this.state.col)})
            },6700)
        }
    }
    handleAlgorithms(event){
        this.setState({algo:event.target.value})
    }
    handleAnimations(){
        const algo = this.state.algo
        console.log(algo)
        if(algo === 'dijkstra'){
            this.visualizeDijkstra()
        }
        else if(algo === 'A*'){
            this.visualizeAstar()
        }
        else if(algo === 'dfs'){
            this.visualizeDFS()
        }
        else if(algo === 'bfs'){
            this.visualizeBFS()
        }

    }
    handleCLearpath(){
        this.setState({grid:ClearPath(this.state.grid)})
    }
    handleClearboard(){
        this.clearBoard()
    }
    clearBoard(){
        this.GenerateGrid()
        ClearAnimation(this.state.row,this.state.col,this.state.start,this.state.finish)
    }
    animation(){  
        const animations = RecurssiveDivisionMaze(2,this.state.row-3,2,this.state.col-3,"Horizontal")
        setTimeout(()=>{ 
            RecursiveDivisionMazeAnimation(this.state.grid,this.state.start,this.state.finish,animations,this.state.row,this.state.col,3)
        },10)

        setTimeout(()=>{
            this.setState({grid:RecurssiveDivisionMazeState(this.state.grid,this.state.start,this.state.finish,animations,this.state.row,this.state.col)})
        },13000)


    }
    randomMaze(){
        this.clearBoard()
        const animations = RandomMaze(this.state.row,this.state.col,this.state.start,this.state.finish)
        setTimeout(()=>{
            RandomMazeAnimation(animations)
        },10)
        setTimeout(()=>{
            this.setState({grid:RandomMazeAnimationState(this.state.grid,this.state.start,this.state.finish,animations)})
        })
        
    }
    visualizeDijkstra(){
        const animations = DijkstraAlgo(this.state.grid,this.state.start,this.state.finish)
        console.log("main",animations)
        const finishNode = this.state.grid[this.state.finish[0]][this.state.finish[1]]
        const path = shortestPath(finishNode)
        this.setState({grid:ClearPath(this.state.grid)})
        // ClearDijkstraAlgoAnimation(this.state.grid,animations,path)
        setTimeout(()=>{
            DijkstraAlgoAnimation(animations,path)
        },10)
    }
    visualizeAstar(){
        const animations = AstarAlgorithm(this.state.grid,this.state.start,this.state.finish)
        const finishNode = this.state.grid[this.state.finish[0]][this.state.finish[1]]
        const path = shortestPathAstar(finishNode)
        this.setState({grid:ClearPath(this.state.grid)})
        setTimeout(()=>{
            DijkstraAlgoAnimation(animations,path)
        },10)
        console.log(animations)
        console.log(path)

    }
    visualizeDFS(){
        const animations = DepthFirstSearch(this.state.grid,this.state.start,this.state.finish)
        const finishNode = this.state.grid[this.state.finish[0]][this.state.finish[1]]
        const path = DfsPath(finishNode)
        this.setState({grid:ClearPath(this.state.grid)})
        console.log(animations)
        setTimeout(()=>{
            DfsAlgoAnimation(animations,path)
        },10)
    }
    visualizeBFS(){
        console.log("bfs")
        const animations = BreadthFirstSearch(this.state.grid,this.state.start,this.state.finish)
        const finishNode = this.state.grid[this.state.finish[0]][this.state.finish[1]]
        const path = BfsPath(finishNode)
        this.setState({grid:ClearPath(this.state.grid)})
        console.log(animations)
        setTimeout(()=>{
            DijkstraAlgoAnimation(animations,path)
        },10)
    }
    // updateDimensions = () => {
    //     this.setState({ width: window.innerWidth, height: window.innerHeight,col: Math.floor((window.innerWidth*55)/1550) });
    //     this.GenerateGrid()
    //   };
    componentDidMount(){
        this.GenerateGrid()
        // window.addEventListener('resize', this.updateDimensions);
    }
    // componentWillUnmount() {
    //     window.removeEventListener('resize', this.updateDimensions);
    //   }
    render() {
        return (
            <React.Fragment>
                <div className="navbar">
                    <div className="navbar_wrapper">
                        <h4 className="mx-2 mt-3">Pathfinding visualizer</h4>
                        <div className="select_wrapper"> 
                            <FormControl id = "maze_form" className="mx-3" style={{width:"170px"}}>
                                <InputLabel id="demo-simple-select-label">Maze & Patterns</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange = {this.handleMaze.bind(this)}
                                >
                                <MenuItem value={'recd'}>Recursive Division</MenuItem>
                                <MenuItem value={"recdh"}>Recursive Division (Horizontal skew)</MenuItem>
                                <MenuItem value={"recdv"}>Recursive Division (Vertical skew)</MenuItem>
                                <MenuItem value={"rdm"}>Random Maze</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl id = "maze_form" className="mx-3" style={{width:"170px"}}>
                                <InputLabel id="demo-simple-select-label">Algorithms</InputLabel>
                                <Select
                                onChange={this.handleAlgorithms.bind(this)}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                >
                                <MenuItem value={'dijkstra'}>Dijkstra Algorithms</MenuItem>
                                <MenuItem value={"A*"}>A* Algorithm</MenuItem>
                                <MenuItem value={"dfs"}>Depth-first Search</MenuItem>
                                <MenuItem value={"bfs"}>Breadth-first Search</MenuItem>
                                </Select>
                            </FormControl>
                            <button onClick={this.handleAnimations.bind(this)} className="btn btn-warning mt-2 mx-3">Visualize</button>
                            <button onClick={this.handleCLearpath.bind(this)} id = "clear_btn"className="mt-2 mx-5">Clear path</button>
                            <button onClick={this.handleClearboard.bind(this)} id = "clear_btn" className="mt-2 mx-4">Clear board</button>   
                        </div>
                    </div> 
                </div>
                 <div id='mainText'>
                    <ul>
                        <li>
                            <div class="start"></div>Start Node</li>
                        <li>
                            <div class="target"></div>Target Nodes
                        </li>
                        <li>
                            <div class="unvisited"></div>Unvisited Node</li>
                        <li>
                            <div class="visited"></div><div class="visitedobject">
                             {/* <div class="visited_far"></div>
                             <div class="visitedobject_far"></div>  */}
                            </div>Visited Nodes</li>
                        <li>
                            <div class="shortest-path"></div>Shortest-path Node</li>
                        <li>
                            <div class="wall"></div>Wall Node
                        </li>
                    </ul>
                </div> 
                <div className="container mt-1 d-flex justify-content-center">
                    Start node Row :<input onChange={this.handleStartRow.bind(this)} className="mx-2 input" value= {this.state.start[0]} type="number" min="0" max="20"></input>
                    Start node Column :<input onChange={this.handleStartCol.bind(this)} className="mx-2 input" value= {this.state.start[1]} type="number" min="0" max="54"></input>
                    Finish node Row :<input onChange={this.handleFinishRow.bind(this)} className="mx-2 input" value= {this.state.finish[0]} type="number" min="0" max="20"></input>
                    Finish node Column :<input onChange={this.handleFinishCol.bind(this)} className="mx-2 input" value= {this.state.finish[1]} type="number" min="0" max="54"></input>
                </div>
                <div className="grid_container">
                    {/* <div className="button_grp container d-flex justify-content-center">
                        <button className="btn btn-primary mx-3 my-3" onClick={this.animation.bind(this)}>Generate Maze</button>
                        <button className="btn btn-primary mx-3 my-3" onClick={this.randomMaze.bind(this)}>Random Maze</button>
                        <button className="btn btn-warning mx-3 my-3" onClick={this.visualizeDijkstra.bind(this)}>Visualize Dijkstra</button>
                        <button className="btn btn-warning mx-3 my-3" onClick={this.visualizeAstar.bind(this)}>Visualize A*</button>
                        <button className="btn btn-warning mx-3 my-3" onClick={this.visualizeDFS.bind(this)}>Visualize DFS</button>
                        <button className="btn btn-warning mx-3 my-3" onClick={this.visualizeBFS.bind(this)}>Visualize BFS</button>
                        <button className="btn btn-success mt-3" onClick = {this.clearBoard.bind(this)}>Clear Board</button> 
                    </div> */}
                    <div className="grid_row_wrapper">
                        {this.state.grid.map((row,rowIdx)=>{
                                return(
                                        <div key={`${rowIdx}`} className="grid_row">
                                            {row.map((column,colIdx)=>{
                                                const {row,col,isWall,isStart,isFinish} = column;
                                                    return(              
                                                        <Node 
                                                            col = {col}
                                                            row = {row} 
                                                            isStart = {isStart}
                                                            isFinish = {isFinish}
                                                            isWall = {isWall}
                                                            key={`{${rowIdx}_${colIdx}}`}
                                                            onMouseEnter={(row,col)=>{this.handleonMouseEnter(row,col)}}
                                                            onMouseUp={(row,col)=>{this.handleMouseUp(row,col)}}
                                                            onMouseDown={(row,col)=>{this.handleMouseDown(row,col)}}
                                                        />
                                                )         
                                            })}
                                        </div>   
                                )
                            })
                        }
                    </div>
                        
                </div>
            </React.Fragment>
            
        )
    }
}



/* <div id='mainText'>
                    <ul>
                        <li>
                            <div class="start"></div>Start Node</li>
                        <li>
                            <div class="target"></div>Target Nodes
                        </li>
                        <li>
                            <div class="unvisited"></div>Unvisited Node</li>
                        <li>
                            <div class="visited"></div><div class="visitedobject">
                            {/* <div class="visited_far"></div><div class="visitedobject_far"></div> *
                            </div>Visited Nodes</li>
                        <li>
                            <div class="shortest-path"></div>Shortest-path Node</li>
                        <li>
                            <div class="wall"></div>Wall Node
                        </li>
                    </ul>
                </div> */