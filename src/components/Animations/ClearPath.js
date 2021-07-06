export const ClearPath =(grid)=>{
    const newGrid = grid.slice()
    for(let i = 0;i < grid.length;i++){
        for(let j = 0 ; j < grid[0].length ; j++){
            const node = newGrid[i][j]
            const newNode={
                ...node,
                fValue : Infinity,
                gValue : Infinity,
                previosNode: null,
                isVisited : false
            }
            newGrid[node.row][node.col] = newNode
            const {row,col,isStart,isFinish,isWall} = grid[i][j]
            const id = `${row}+${col}`
        document.getElementById(id).className = isStart?"node node_start":isFinish?"node node_finish":isWall 
        ?"node node_wall":"node"
        }
    }
    
    // const length = animations.length
    // for(let i = 0; i < length;i++){
    //     const node = animations[i]
    //     const newNode={
    //         ...node,
    //         fValue : Infinity,
    //         gValue : Infinity,
    //         previosNode: null,
    //         isVisited : false
    //     }
    //     newGrid[node.row][node.col] = newNode
    // }
    return newGrid
}