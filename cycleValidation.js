//This is the most important work where we discuss about the Cyclic-Detection Graph Algorithm help me making formula implementation Correctly



let Total_collectedGraphComponent = [];

//Applying  Cycle Detection Algorithm and path tracing
//Work for Storage in 2-D matrix

let graphComponentMatrix = []; // need 2-D matrixArray

// //2-D matrix
// for(let i = 0; i < rows; i++){
//     let rowArray = []; //this will be 100 of rows 
//     for(let j = 0; j < columns; j++){
//         //this loop target cell property
//         //where in cell we add property to it
//         //why are array -> more then one child relationship(dependency)
//         rowArray.push([]);

//     }
//     //add rowArray in graph-component matrix -> Bigger Array
//     graphComponentMatrix.push(rowArray);
// }


//this work to return boolean value 
// if true mean it's Cyclic Network formed
// if False mean it's not a Cyclic Network formed
function isGraphCyclic(graphComponentMatrix){
    // Dependency---> visitedArray , dfsVisitedArray ---> make 2-D matrix dependency

    let visitedArray = []; // Node visit trace
    let dfsVisitedArray = []; // Stack visit trace

    // 100X26 making 2-D grid
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

    // Graph can we check in two ore more phase to evaluate
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            // CHECK is cell is visited or not
            if(visitedArray[i][j] === false){
                // detect function --> through this we able to define or know the relation
                // all relation store in graphComponentMatrix
                let response = dfsCycleDetection(graphComponentMatrix, i, j, visitedArray, dfsVisitedArray);
                // Found Cycle-Graph then -----> Return True immediately
                if(response == true){
                    // return true;
                    // instead of returning true, now we return array[i,j] -> source point
                    return [i , j];
                }
            }
        }
    }
    return null;
}


// Recursively check on every point to get some value return(response)
// Star --> visitedArray(True) | dfsVisitedArray(True)
// End ---> dfsVisitedArray(False)
// If vis[i][j] ---> true mean ---> already explored Path so go Back no use to explore again
// Cycle detection Condition --> if(vis[i][j] == true && dfsVis[i][j] == true) ---> cycle
// return boolean
// true - cycle and false - not cyclic
function dfsCycleDetection(graphComponentMatrix, srcRow, srcColumn, visitedArray, dfsVisitedArray){  
    // written the function code base on the above algo(pseudo code)
    // Start
    visitedArray[srcRow][srcColumn] = true;
    dfsVisitedArray[srcRow][srcColumn] = true;
            //  B1
    //A1 -> [ [0,1], [1,0], [5,10], [10 ,11], ...... ]
    // to know dependency 
    for(let children = 0; children < graphComponentMatrix[srcRow][srcColumn].length; children++){
        //take the rowId and columnId from the cell->children
        let [childRowId, childColumnId] = graphComponentMatrix[srcRow][srcColumn][children];
        //check 
        if(visitedArray[childRowId][childColumnId] === false){
            let response = dfsCycleDetection(graphComponentMatrix,childRowId,childColumnId,visitedArray,dfsVisitedArray);
            // Found Cycle-Graph then -----> Return True immediately
            if(response ===  true){
                return true;
            }
        }
        else if(visitedArray[childRowId][childColumnId] === true && dfsVisitedArray[childRowId][childColumnId] === true){
            // Found Cycle-Graph then -----> Return True immediately
            return true;
        }
    }

    // End
    dfsVisitedArray[srcRow][srcColumn] = false;
    //if any case of not cycle then return false
    return false;
}
