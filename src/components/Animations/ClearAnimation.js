const ClearAnimation = (row,col,start,finish) => {

    for(let i = 0; i < row; i++){
        for(let j = 0; j < col; j++){
            const nodeId = `${i}+${j}`
            const isStart = i === start[0] && j === start[1]
            const isFinish = i === finish[0] && j === finish[1]
            document.getElementById(nodeId).className = isStart ?'node node_start': isFinish?"node node_finish":"node"
            // const node = document.getElementById(nodeId)
            // node.style.backgroundColor = 'white'
            // node.style.border = '1px solid #3f73e47c'
        }
    }
}

export default ClearAnimation