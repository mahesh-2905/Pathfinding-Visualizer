export const DijkstraAlgo = (grid,start,finish) =>{

    const startNode = grid[start[0]][start[1]]
    const finishNode = grid[finish[0]][finish[1]]
    const visitedNodes = []
    startNode.distance = 0
    console.log(grid)
    const unvisitedNodes = getAllNodes(grid)
    console.log(unvisitedNodes)
    while(unvisitedNodes.length !== 0){
        console.log("entered",unvisitedNodes.length)
        sortNodesbyDistance(unvisitedNodes)
        const closestNode = unvisitedNodes.shift()
        console.log("after shift",unvisitedNodes.length)
        if(closestNode.isWallAnimate){
            continue
        }
        if(closestNode.distance === Infinity){
            console.log("break due to Infinity distance")
            return visitedNodes
        }
        
        closestNode.isVisited = true;
        visitedNodes.push(closestNode);

        if(closestNode === finishNode){
            console.log("break due to reached finish")
            return visitedNodes
        }
        updateunVisitedNodes(closestNode,grid)
    }


}

export const shortestPath = (finishNode)=>{
    const path = []
    let currNode = finishNode
    while(currNode != null){
        path.unshift(currNode)
        currNode  = currNode.previousNode
    }
    return path
}

const updateunVisitedNodes = (node,grid)=>{
    const unvisitedNeighbors = getunvisitedNeighbors(node,grid)
    // console.log("unvisited nodes---",unvisitedNeighbors)
    for(const neighbour of unvisitedNeighbors){
        neighbour.distance = node.distance+1
        neighbour.previousNode = node
    }
}

const getunvisitedNeighbors = (node,grid)=>{
  const unVisitedneighbors = [];
  const {col, row} = node;
  if (row > 0) unVisitedneighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) unVisitedneighbors.push(grid[row + 1][col]);
  if (col > 0) unVisitedneighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) unVisitedneighbors.push(grid[row][col + 1]);
//   console.log("unvisited nodes---",unVisitedneighbors)
  return unVisitedneighbors.filter(neighbor => !neighbor.isVisited);
}


const sortNodesbyDistance = (nodes)=>{
    // console.log("sorting")
    return nodes.sort((nodeA,nodeB)=>nodeA.distance - nodeB.distance)
}

const getAllNodes = (grid)=>{

    const nodes = []
    for(const row of grid){
        for(const node of row){
            nodes.push(node)
        }
    }
    return nodes
}