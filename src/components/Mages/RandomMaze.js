const RandomMaze = (rows,columns,start,finish)=>{
    const animations = [];
    for(let i=0;i<rows;i++){
        const currAnimations = []
        const RandomCols = RandomArray(columns)
        for(let j=0;j<RandomCols.length;j++){
            const isStart = i===start[0] && RandomCols[j] === start[1]
            const isFinish = j=== finish[0] && RandomCols[j] === finish[1]
            if(!isStart && !isFinish){
                currAnimations.push([i,RandomCols[j]])
            }
        }
        animations.push(currAnimations)
    }
    return animations
}

const RandomArray = (columns)=>{
    const arr = [];
    const size = Math.ceil(columns/3)
    for(let i=0;i<size;i++){
        arr.push(Math.floor(Math.random()*columns))
    }
    return arr
}

export default RandomMaze