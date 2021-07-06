const RecursiveDivisionMazeAnimation = (grid,start,finish,animations,row,col,speed)=>{
    console.log(grid)
    console.log(animations)
    
    
    for(let i= 0 ; i< col; i++){
        setTimeout(()=>{
            const topEdge = `0+${i}`;
            const isStart = 0 === start[0] && i === start[1]
            const isFinsh = 0 === finish[0] && i === finish[1]
            document.getElementById(topEdge).className = isStart?"node node_start":isFinsh?"node node_finish":"node animate_wall"
            // const topEdgeNode = document.getElementById(topEdge);
            // topEdgeNode.style.backgroundColor = '#24305E'
            // topEdgeNode.style.border = '1px solid #24305E'
        },i*5*speed)
        
    }
    setTimeout(()=>{
        for(let i=0;i<row;i++){
            setTimeout(()=>{
                const edge1 = `${i}+0`
                const edge2 = `${i}+${col-1}`
                const isStart1 = i === start[0] && 0 === start[1]
                const isFinsh1 = i ===finish[0] && 0 === finish[1]
                const isStart2 = i === start[0] && col-1 === start[1]
                const isFinsh2 = i ===finish[0] && col-1 === finish[1]  
                document.getElementById(edge1).className = isStart1?"node node_start":isFinsh1?"node node_finish":"node animate_wall"
                document.getElementById(edge2).className = isStart2?"node node_start":isFinsh2?"node node_finish":"node animate_wall"
                // const edgeNode1 =  document.getElementById(edge1)
                // const edgeNode2 =  document.getElementById(edge2)
                // edgeNode1.style.backgroundColor = '#24305E'
                // edgeNode1.style.border = '1px solid #24305E'
                // edgeNode2.style.backgroundColor = '#24305E'
                // edgeNode2.style.border = '1px solid #24305E'
            },i*5*speed)      
        }
    },col*5*speed)
    setTimeout(()=>{
        for(let i= 0 ; i< col; i++){
            setTimeout(()=>{
                const bottomEdge = `${row-1}+${i}`;
                const isStart = row-1 === start[0] && i === start[1]
                const isFinsh = row-1 ===finish[0] && i === finish[1] 
                document.getElementById(bottomEdge).className = isStart?"node node_start":isFinsh?"node node_finish":"node animate_wall"
                // const bottomEdgeNode = document.getElementById(bottomEdge);
                // bottomEdgeNode.style.backgroundColor = '#24305E'
                // bottomEdgeNode.style.border = '1px solid #24305E'
            },i*5*speed)
            
        }
    },row*20*speed)
    setTimeout(()=>{
    const animeLength = animations.length
    for(let i=0 ; i< animeLength; i++){
        setTimeout(()=>{
            const currAnime = animations[i]
            const currAnimeLength = currAnime.length

            for(let j=0 ; j< currAnimeLength ;j++){
                setTimeout(()=>{
                    const anime = currAnime[j]
                    const id = `${anime[0]}+${anime[1]}`
                    const isStart = anime[0] === start[0] && anime[1] === start[1]
                    const isFinsh = anime[0] ===finish[0] && anime[1] === finish[1] 
                    document.getElementById(id).className = isStart?"node node_start":isFinsh?"node node_finish":"node animate_wall"
                    // console.log(id)
                    // const node = document.getElementById(id)
                    // console.log(node)
                    // node.style.backgroundColor="#24305E"
                    // node.style.border = '1px solid #24305E' 
                },j*7*speed)
        }
        },i*30*speed)
        
    }
    },col*12*speed)
    
    
}

export const  RecurssiveDivisionMazeState =(grid,start,finish,animations,row,col)=>{
    console.log("start",grid)
    let newGrid = grid.slice()
    console.log("sliced",newGrid)
    for(let i=0;i<row;i++){
        for(let j=0;j<col;j++){
            if(i===0 || j===0 || i === row-1 || j === col-1){
                const node = newGrid[i][j]
                const isStart = i === start[0] && j === start[1]
                const isFinish = i === finish[0] && j === finish[1]
                const newNode = {
                    ...node,
                    isWall:isStart || isFinish ? false:true,
                    isWallAnimate: isStart || isFinish ? false:true
                }
                newGrid[i][j] = newNode
                // console.log(newGrid[i][j])
            }
        }
    }

    const animeLength = animations.length

    for(let i = 0 ; i < animeLength ; i++){
        const currAnime = animations[i]
        const m = currAnime.length
        for(let j = 0 ; j < m ; j++){
            const anime = currAnime[j]
            const node = newGrid[anime[0]][anime[1]]
            const isStart = anime[0] === start[0] && anime[1] === start[1]
            const isFinish = anime[0] === finish[0] && anime[1] === finish[1]
            const newNode = {
                ...node,
                isWall:isStart || isFinish ? false:true,
                isWallAnimate : isStart || isFinish ? false : true
            }
            newGrid[anime[0]][anime[1]] = newNode
        }
    }
    console.log("modified",newGrid)
    return newGrid;
}

export default RecursiveDivisionMazeAnimation;


// for(let i= 0 ; i< col; i++){
    //     const node = newGrid[0][i]
    //     const newNode = {
    //         ...node,
    //         isWallAnimate:(0 === start[0] && i === start[1]) || (0 === finish[0] && i === finish[1])?false:true,
    //         // isWall:(0 === start[0] && i === start[1]) || (0 === finish[0] && i === finish[1])?false:true,
    //         isStart: 0 === start[0] && i === start[1]?true:false,
    //         isFinish: 0 === finish[0] && i === finish[1]?true:false,
    //     }
    //     newGrid[0][i] = newNode
    // }
    // for(let i= 0 ; i< col; i++){
    //     const node = newGrid[row-1][i]
    //     const newNode = {
    //         ...node,
    //         isWallAnimate:(row-1 === start[0] && i === start[1]) || (row-1 === finish[0] && i === finish[1])?false:true,
    //         // isWall:(row-1 === start[0] && i === start[1]) || (row-1 === finish[0] && i === finish[1])?false:true,
    //         isStart: row-1 === start[0] && i === start[1]?true:false,
    //         isFinish: row-1 === finish[0] && i === finish[1]?true:false,
    //     }
    //     newGrid[0][i] = newNode
        
    // }
    // for(let i=0;i<row;i++){
    //         const node1 = newGrid[i][0]
    //         const node2 = newGrid[i][col-1]
    //         const newNode1 = {
    //             ...node1,
    //             isWallAnimate:(i === start[0] && 0 === start[1]) || (i === finish[0] && 0 === finish[1])?false:true,
    //             // isWall:(i === start[0] && 0 === start[1]) || (i === finish[0] && 0 === finish[1])?false:true,
    //             isStart: i === start[0] && 0 === start[1]?true:false,
    //             isFinish: i === finish[0] && 0 === finish[1]?true:false,
    //         }
    //         const newNode2 = {
    //             ...node2,
    //             isWallAnimate:(i === start[0] && col-1 === start[1]) || (i === finish[0] && col-1 === finish[1])?false:true,
    //             // isWall:(i=== start[0] && col-1 === start[1]) || (i === finish[0] && col-1 === finish[1])?false:!node2.isWall,
    //             isStart: i === start[0] && col-1 === start[1]?true:false,
    //             isFinish: i === finish[0] && col-1 === finish[1]?true:false,
    //         }
    //         newGrid[i][0] = newNode1
    //         newGrid[i][col-1] = newNode2
     
    // }
    // const animeLength = animations.length
    // for(let i=0 ; i< animeLength; i++){
    //         const currAnime = animations[i]
    //         const currAnimeLength = currAnime.length
    //         for(let j=0 ; j< currAnimeLength ;j++){
    //                 const anime = currAnime[j]
    //                 const node = newGrid[anime[0]][anime[1]]
    //                 const newNode = {
    //                     ...node,
    //                     isWallAnimate:(anime[0] === start[0] && anime[1] === start[1]) || (anime[0] === finish[0] && anime[1] === finish[1])?false:true,
    //                     // isWall:(anime[0] === start[0] && anime[1] === start[1]) || (anime[0] === finish[0] && anime[1] === finish[1])?false:true,
    //                     isStart: anime[0] === start[0] && anime[1] === start[1]?true:false,
    //                     isFinish: anime[0] === finish[0] && anime[1] === finish[1]?true:false,
    //                 }
    //             newGrid[anime[0]][anime[1]] = newNode   
    //     }
        
    // }