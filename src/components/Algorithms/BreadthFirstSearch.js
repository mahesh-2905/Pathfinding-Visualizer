export const BreadthFirstSearch = (grid,start,finish)=>{
    const startNode = grid[start[0]][start[1]]
    const endNode = grid[finish[0]][finish[1]]
    const animations = []
    const structure = [startNode]
    while(structure.length){
        console.log("entered")
        let currnode = structure.shift()
        animations.push(currnode)
        currnode.isVisited = true
        if(currnode === endNode){
            console.log("end due to finished")
            return animations
        }
        let neighbours = getNeighbours(currnode,grid)
        for(let neighbour of neighbours){
            if(neighbour.isVisited){
                continue
            }
            else{
                neighbour.isVisited = true
                neighbour.previousNode = currnode
                structure.push(neighbour)
            }
        }
    }
    return animations
}

export const BfsPath = (endNode)=>{
    let curNode = endNode
    const path = []
    while(curNode){
        path.unshift(curNode)
        curNode = curNode.previousNode
    }
    return path
}
const getNeighbours = (node,grid)=>{
    const neighbours = []
    const row = grid.length
    const col = grid[0].length
    const currRow = node.row
    const currCol = node.col
    // console.log(currRow,currCol)

    if(currRow < row-1){
        if(!grid[currRow+1][currCol].isWallAnimate){
            neighbours.push(grid[currRow+1][currCol])
        }
    }
    if(currCol < col-1){
        if(!grid[currRow][currCol+1].isWallAnimate){
            neighbours.push(grid[currRow][currCol+1])
        }
    }
    if(currRow > 0){
        if(!grid[currRow-1][currCol].isWallAnimate ){
            neighbours.push(grid[currRow-1][currCol])
        }
    }
    if(currCol > 0){
        if(!grid[currRow][currCol-1].isWallAnimate){
            neighbours.push(grid[currRow][currCol-1])
        }
    }
    return neighbours
}