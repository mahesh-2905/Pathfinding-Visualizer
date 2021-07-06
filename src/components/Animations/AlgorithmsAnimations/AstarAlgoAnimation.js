export const clearAstarAlgorithm =(grid,animations,path)=>{
    for(let i = 0;i < grid.length;i++){
        for(let j = 0 ; j < grid[0].length ; j++){
            const {row,col,isStart,isFinish,isWall} = grid[i][j]
            const id = `${row}+${col}`
        document.getElementById(id).className = isStart?"node node_start":isFinish?"node node_finish":isWall 
        ?"node node_wall":"node"
        }
    }
    const newGrid = grid
    const length = animations.length
    for(let i = 0; i < length;i++){
        const node = animations[i]
        const newNode={
            ...node,
            fValue : Infinity,
            gValue : Infinity,
            previosNode: null
        }
        newGrid[node.row][node.col] = newNode
    }
    return newGrid
}