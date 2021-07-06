const ToggledWallAnimation=(grid,row,col,start,finish)=>{
    const newGrid = grid.slice()
    const node = newGrid[row][col]
    const newNode = {
        ...node,
        isWall:(row === start[0] && col === start[1]) || (row === finish[0] && col === finish[1])?false:!node.isWall,
        isWallAnimate:(row === start[0] && col === start[1]) || (row === finish[0] && col === finish[1])?false:!node.isWallAnimate,
        isStart: row === start[0] && col === start[1]?true:false,
        isFinish: row === finish[0] && col === finish[1]?true:false,
    }
    newGrid[row][col] = newNode
    return newGrid
}

export default ToggledWallAnimation;