//  This is the tracing path with the Color Animation Features
//  Also we add the some functionality that delay,setTimeout so that animation can happen
//  setTimeout  ---> This is the Asynchronous world



// now using the best practice
// for color tracking path use  async -> sync -> Promises 
function colorPromise(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    })
}



// this work to return boolean value 
// this is the working of the color Tracing off the cells if cyclic Network form between them
async function isGraphCyclicTracePath(graphComponentMatrix, isCyclicResponse){

    // we get two value source as well as Source point
    // for tracing point we get isCyclicResponse
    let [srcRow , srcColumn] = isCyclicResponse;

    // Dependency---> visitedArray , dfsVisitedArray ---> make 2-D matrix dependency

    let visitedArray = []; // Node visit trace
    let dfsVisitedArray = []; // Stack visit trace

    // 100X26 making 2-D grid
    // this is default value storing point
    for(let i = 0; i < rows; i++){
        let visitedRow = [];
        let dfsVisitedRow = [];
        for(let j = 0; j < columns; j++){
            visitedRow.push(false); // default value in dependency will be false
            dfsVisitedRow.push(false);
        }
        visitedArray.push(visitedRow);
        dfsVisitedArray.push(dfsVisitedRow);
    }


    // color Tracking Feature function here start
    let response = await dfsCycleDetectionTracePath(graphComponentMatrix, srcRow, srcColumn, visitedArray, dfsVisitedArray);
    // console.log(response , " this is response ans ");
    if(response === true){
        // return true;
        return Promise.resolve(true);
    }

    // return false;
    return Promise.resolve(false);
}




// Coloring cells for tracking 
async function dfsCycleDetectionTracePath(graphComponentMatrix, srcRow, srcColumn, visitedArray, dfsVisitedArray){  
    // Start written the function code base on the above algo(pseudo code)
    
    visitedArray[srcRow][srcColumn] = true;
    dfsVisitedArray[srcRow][srcColumn] = true;

    // through this we know the current cell address
    let cell = document.querySelector(`.cells-box[rowId="${srcRow}"][colId="${srcColumn}"]`);
    cell.style.backgroundColor = "lightblue";
    // now here we are waiting for animation or color detection show path
    await colorPromise(); // 1sec finished


    // to know dependency(children) mean Parent child 
    for(let children = 0; children < graphComponentMatrix[srcRow][srcColumn].length; children++){
        //take the rowId and columnId from the cell->children
        let [childRowId, childColumnId] = graphComponentMatrix[srcRow][srcColumn][children];
        //check 
        if(visitedArray[childRowId][childColumnId] === false){
            let response = await dfsCycleDetectionTracePath(graphComponentMatrix,childRowId,childColumnId,visitedArray,dfsVisitedArray);
            // Found Cycle-Graph then -----> Return True immediately
            if(response ===  true){
                //going back in path we need to take care, by going back that to remove the blue color through the path
                cell.style.backgroundColor = "transparent";
                await colorPromise();
                // return true
                return Promise.resolve(true);
            }
        }
        else if(visitedArray[childRowId][childColumnId] === true && dfsVisitedArray[childRowId][childColumnId] === true){
            // this is tracing with the color to indicate the user interactivity( end cycle detect)
            let cyclicCell = document.querySelector(`.cells-box[rowId="${childRowId}"][colId="${childColumnId}"]`);

            cyclicCell.style.backgroundColor = "lightsalmon";
            await colorPromise();// 1sec wait
            cyclicCell.style.backgroundColor = "transparent";
            
            cell.style.backgroundColor = "transparent";
            await colorPromise();// 1sec wait

            // Found Cycle-Graph then -----> Return True immediately
            // return true;
            return Promise.resolve(true);
        }
    }

    // End
    dfsVisitedArray[srcRow][srcColumn] = false;
    //if any case of not cycle then return false
    // return false;
    return Promise.resolve(false);
}
