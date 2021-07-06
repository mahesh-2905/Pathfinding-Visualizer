const DfsAlgoAnimation = (animations,path)=>{
    // console.log(animations,path)
    const length = animations.length;
    for(let i = 0; i <= length; i++){
        if(i === length){
            setTimeout(()=>{
                shortestPathAnimation(path)
            },14*i)
            return
        }
        setTimeout(()=>{
            const {row,col,isStart,isFinish} = animations[i]
            const id = `${row}+${col}`
            document.getElementById(id).className = isStart?"node node_start":isFinish?"node node_finish":"node node_visited"
        },i*13)
    }
    
    
}
const shortestPathAnimation = (animations)=>{
    const length = animations.length;
    for(let i = 0; i < length; i++){
        setTimeout(()=>{
            const {row,col,isStart,isFinish} = animations[i]
            const id = `${row}+${col}`
            document.getElementById(id).className = isStart?"node node_start":isFinish?"node node_finish":"node node_path"
        },i*25)
    }
 }

export const ClearDijkstraAlgoAnimation=(grid,visitedNodes,path)=>{

    for(let i = 0;i < grid.length;i++){
        for(let j = 0 ; j < grid[0].length ; j++){
            const {row,col,isStart,isFinish,isWall} = grid[i][j]
            const id = `${row}+${col}`
        document.getElementById(id).className = isStart?"node node_start":isFinish?"node node_finish":isWall 
        ?"node node_wall":"node"
        }
    }

    // const length = visitedNodes.length;
    // for(let i = 0; i < length; i++){
    //     const {row,col,isStart,isFinish,isWall} = visitedNodes[i]
    //     const id = `${row}+${col}`
    //     document.getElementById(id).className = isStart?"node node_start":isFinish?"node node_finish":isWall 
    //     ?"node node_wall":"node"
    // }
    // const pathLength = path.length;
    // for(let i = 0; i < pathLength; i++){
    //         const {row,col,isStart,isFinish,isWall} = path[i]
    //         const id = `${row}+${col}`
    //         document.getElementById(id).className = isStart?"node node_start":isFinish?"node node_finish":isWall?"node node_wall":"node"
    // }
}

export default DfsAlgoAnimation
