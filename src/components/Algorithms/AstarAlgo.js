export const AstarAlgorithm = (grid,start,finish)=>{
    console.log(grid)
    const startNode = grid[start[0]][start[1]]
    const endNode = grid[finish[0]][finish[1]]
    console.log(startNode,endNode)
    // console.log("start",nodesToVisit)
    const visitedNodesInOrder = [startNode]
    startNode.gValue = 0
    startNode.fValue = getManhattanDistance(startNode,endNode)
    console.log(startNode.fValue)
    // const nodesToVisit = new MinHeap([startNode])
    const nodesToVisit = [startNode] 

    while(nodesToVisit.length !== 0){
        console.log("rinning")
        // console.log("entered",nodesToVisit.length)
        sortNodesbyDistance(nodesToVisit)
        // const currNode = nodesToVisit.remove()
        const currNode = nodesToVisit.shift()
        console.log("removed value ->",currNode.fValue)
        // console.log(currNode.row,currNode.col,endNode.row,endNode.col)
        // console.log("after shift",nodesToVisit.length)
        if(currNode.row === endNode.row && currNode.col === endNode.col){
            console.log("end due to reached")
            break
        }
        const neighbours = getNeighbours(currNode,grid)
        console.log("--------------------------------")
        for(const neighbour of neighbours){

            if(neighbour.isWallAnimate){
                
                continue
            }
            const curr_gvalue = currNode.gValue + 1
            if(curr_gvalue >= neighbour.gValue){
                console.log("continues")
                continue
            }
            neighbour.previousNode = currNode
            neighbour.gValue = curr_gvalue
            neighbour.fValue = curr_gvalue + getManhattanDistance(neighbour,endNode)
            console.log(neighbour.fValue)
            if(neighbour in nodesToVisit){
                continue
            }
            else{
                nodesToVisit.push(neighbour)
                visitedNodesInOrder.push(neighbour)
            }
            // if(!nodesToVisit.containsNode(neighbour)){
            //     visitedNodesInOrder.push(neighbour)
            //     nodesToVisit.insert(neighbour)
            // }
            // else{
            //     nodesToVisit.update(neighbour)
            // }
        }
        console.log("--------------------------------")
    }
    return visitedNodesInOrder
}

export const  shortestPathAstar = (endNode) => {

    if(endNode.previousNode === null){
        return []
    }
    let currNode = endNode
    const path = []
    while(currNode !== null){
        path.unshift(currNode)
        currNode = currNode.previousNode
    }
    return path
}
const sortNodesbyDistance = (nodes)=>{
    nodes.sort((nodeA,nodeB)=> nodeA.fValue - nodeB.fValue)
}

const getManhattanDistance = (currNode,endNode)=>{

    const currRow = currNode.row 
    const currCol = currNode.col
    const endRow = endNode.row
    const endCol = endNode.col

    return Math.abs(currRow - endRow) + Math.abs(currCol - endCol)
}

const getNeighbours = (node ,grid)=>{
    
    const neighbours = []
    const row = grid.length
    const col = grid[0].length
    const currRow = node.row
    const currCol = node.col
    console.log(currRow,currCol)

    if(currRow < row-1){
        neighbours.push(grid[currRow+1][currCol])
    }
    if(currRow > 0){
        neighbours.push(grid[currRow-1][currCol])
    }
    if(currCol < col-1){
        neighbours.push(grid[currRow][currCol+1])
    }
    if(currCol > 0){
        neighbours.push(grid[currRow][currCol-1])
    }
    return neighbours
}

// class MinHeap{

//     constructor(array){

//         this.nodePositionInHeap = array.reduce((obj,node,i)=>{
//             obj[node.id] = i;
//             return obj
//         },{});
//         this.heap = this.buildHeap(array);
//     }

//     isEmpty(){
//         return this.heap.length === 0
//     }

//     buildHeap(array){
//         const firstParentIdx = Math.floor((array.length - 2)/2)
//         for(let currIdx = firstParentIdx ; currIdx >= 0;currIdx--){
//             this.shiftDown(currIdx,array.length-1,array);
//         }
//         return array
//     }
//     shiftDown(currIdx,endIdx,heap){
//         let childOneIdx = currIdx * 2 + 1
//         while(childOneIdx <= endIdx){
//             const childTwoIdx = currIdx * 2 + 2 <= endIdx ? childOneIdx * 2 + 2 : -1
//             let IdxtoSwap;
//             if(childTwoIdx !== -1 && heap[childTwoIdx].fValue < heap[childOneIdx].fValue){
//                 IdxtoSwap = childTwoIdx
//             }else{
//                 IdxtoSwap = childOneIdx
//             }
//             if(heap[IdxtoSwap].fValue < heap[currIdx].fValue){
//                 this.swap(IdxtoSwap,currIdx,heap)
//                 currIdx = IdxtoSwap
//                 childOneIdx = currIdx * 2 + 1
//             }else{
//                 return
//             }
//         }
//     }

//     shiftUp(currIdx,heap){
//         let parentIdx = Math.floor((currIdx - 1)/2)
//         while(currIdx > 0 && heap[currIdx].fValue < heap[parentIdx].fValue){
//             this.swap(currIdx,parentIdx,heap);
//             currIdx = parentIdx
//             parentIdx = Math.floor((currIdx - 1)/2)
//         }
//     }

//     remove(){
//         if(this.isEmpty()) return ;
//         this.swap(0,this.heap.length-1,this.heap)
//         const node = this.heap.pop()
//         delete this.nodePositionInHeap[node.id]
//         this.shiftDown(0,this.heap.length-1,this.heap)
//         return node
//     }

//     insert(node){
//         this.heap.push(node)
//         this.nodePositionInHeap[node.id] = this.heap.length - 1
//         this.shiftUp(this.heap.length - 1,this.heap)
//     }

//     swap(i,j,heap){
//         this.nodePositionInHeap[this.heap[i].id] = j
//         this.nodePositionInHeap[this.heap[j].id] = i
//         const temp = heap[j]
//         heap[j] = heap[i]
//         heap[i] = temp
//     }

//     containsNode(node){
//         return node.id in this.nodePositionInHeap;
//     }

//     update(node){
//         this.shiftUp(this.nodePositionInHeap[node.id],this.heap)
//     }
// }