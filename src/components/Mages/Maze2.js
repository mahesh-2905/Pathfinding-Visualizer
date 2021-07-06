const Maze2 = (startRow,endRow,startCol,endCol,Orientation)=>{
    const animations = []
    RecurssiveDivisionMazeHelper(startRow,endRow,startCol,endCol,Orientation,animations)
    return animations
}
const RandomNumber =(min,max)=>{
    return Math.floor(Math.random()*(max-min+1)+min)
}

const RecurssiveDivisionMazeHelper =(startRow,endRow,startCol,endCol,Orientation,animations)=>{

    if(endRow < startRow || endCol < startCol){
        return
    }

    if(Orientation === "Horizontal"){

        let possibleCols = [];
        let possibleRows = [];
        let currAnimations = [];

        for(let i=startRow; i<=endRow; i+=2){
            possibleRows.push(i)
        }
        for(let i = startCol-1; i<=endCol+1; i+=2){
            possibleCols.push(i)
        }

        let randomRowIdx = RandomNumber(0,possibleRows.length-1)
        let randomColIdx = RandomNumber(0,possibleCols.length-1)
        let currRow = possibleRows[randomRowIdx]
        let randomCol = possibleCols[randomColIdx]

        for(let i=startCol-1 ; i <= endCol+1;i++){

            if(i!== randomCol){
                currAnimations.push([currRow,i])
            }
        }
        animations.push(currAnimations)

        if(currRow-(startRow+2) > endCol-startCol){

            RecurssiveDivisionMazeHelper(startRow,currRow-2,startCol,endCol,Orientation,animations)

        }
        else{

            RecurssiveDivisionMazeHelper(startRow,currRow-2,startCol,endCol,"Horizontal",animations)


        }
        if(endRow-(currRow+2) > endCol-startCol){

            RecurssiveDivisionMazeHelper(currRow+2,endRow,startCol,endCol,Orientation,animations)


        }
        else{
            RecurssiveDivisionMazeHelper(currRow+2,endRow,startCol,endCol,"Vertical ",animations)

        }

    }
    else{

        let possibleCols = [];
        let possibleRows = [];
        let currAnimations = [];

        for(let i=startRow-1; i<=endRow+1; i+=2){
            possibleRows.push(i)
        }
        for(let i = startCol; i<=endCol; i+=2){
            possibleCols.push(i)
        }

        let randomRowIdx = RandomNumber(0,possibleRows.length-1)
        let randomColIdx = RandomNumber(0,possibleCols.length-1)
        let randomRow = possibleRows[randomRowIdx]
        let currCol = possibleCols[randomColIdx]

        for(let i = startRow-1; i <= endRow+1 ; i++){
            if(i !== randomRow){
                currAnimations.push([i,currCol])
            }
        }
        animations.push(currAnimations)

        if(currCol-(startCol+2) > endRow-startRow){

            RecurssiveDivisionMazeHelper(startRow,endRow,startCol,currCol-2,"Horizontal",animations)


        }
        else{

            RecurssiveDivisionMazeHelper(startRow,endRow,startCol,currCol-2,"Horizontal",animations)


        }
        if(endCol-(currCol+2) > endRow-startRow){

            RecurssiveDivisionMazeHelper(startRow,endRow,currCol+2,endCol,"Horizontal",animations)


        }
        else{

            RecurssiveDivisionMazeHelper(startRow,endRow,currCol+2,endCol,Orientation,animations)


        }
    }



}

export default Maze2