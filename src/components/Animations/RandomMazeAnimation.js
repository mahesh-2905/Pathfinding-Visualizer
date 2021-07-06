const RandomMazeAnimation = (animations)=>{
    const size = animations.length;
    for(let i =0 ;i<size;i++){
        const currAnime = animations[i]
        const currAnimeSize = currAnime.length;
        for(let j=0 ;j<currAnimeSize ;j++){
            const curr_node = currAnime[j]
            const curr_node_id = `${curr_node[0]}+${curr_node[1]}`
            document.getElementById(curr_node_id).className = 'node animate_wall'
            // const Node = document.getElementById(curr_node_id)
            // Node.style.backgroundColor ='#24305E'
            // Node.style.border = '1px solid #24305E'
        }
    }
}
export const RandomMazeAnimationState = (grid,start,finish,animations)=>{
    const newGrid = grid.slice()
    const size = animations.length;
    for(let i =0 ;i<size;i++){
        const currAnime = animations[i]
        const currAnimeSize = currAnime.length;
        for(let j=0 ;j<currAnimeSize ;j++){


            const curr_node = currAnime[j]
            const node = newGrid[curr_node[0]][curr_node[1]]
            const isStart = curr_node[0] === start[0] && curr_node[1] === start[1]
            const isFinish = curr_node[0] === finish[0] && curr_node[1] === finish[1]
            const newNode = {
                ...node,
                isWall:isStart || isFinish ? false:true,
                isWallAnimate : isStart || isFinish ? false : true
            }
            newGrid[curr_node[0]][curr_node[1]] = newNode
        }
    }
    return newGrid
}
export default RandomMazeAnimation