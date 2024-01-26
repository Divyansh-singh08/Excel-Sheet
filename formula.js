
// first of all I need to put to every cell to listener 
for(let i = 0; i < rows; i++){
    for(let j = 0; j < columns; j++){
        // now we can access all the cells one by one
        let cell = document.querySelector(`.cells-box[rowId="${i}"][colId="${j}"]`);
        // "blur" eventListener work fast then "click" and so that why able to store data into storage
        cell.addEventListener("blur", (e) => {
            //address value fetch from the addressBar
            let address = addressBar.value;
            // Object access
            let [activeCell , cellProp] = getCellAndCellProp(address);
            // console.log(activeCell , " this is the activeCell answer");
            // now we need data of inside the selected cell  
            let enteredData =  activeCell.innerText;
            // console.log(enteredData , " what data is store");

            // after change performed you have same value then no need to do any things..
            if(enteredData === cellProp.value ){
                return;
            }

            // modified the object value inside it
            // here empty data storage place where we store the blur event data
            cellProp.value = enteredData;
            // console.log(cellProp , " now this is the cellProp ans");

            // If data modifies remove P-C relation, formula empty,update children with new hardcode(modified) value
            // if value get change then do the change in children cells get update value with hardcode value  
            //need to break P-C relationship
            removeChildFromParent(cellProp.formula);
            cellProp.formula = "" ; //
            updateChildrenCells(address);
        })
    }
}



// Now this is the Formula Evaluation ----> in Normal ways

// take formulaBar excess for calculation 
// data which come from the cell value using address-bar 
let formulaBar = document.querySelector(".formula-bar");
// when we press enter button then evaluate the 
// Normal Expression
formulaBar.addEventListener("keydown", async(e) => {
    // written in the formula-Bar div will get pass
    let inputFormula = formulaBar.value;
    // console.log(`this is what i know ${inputFormula}`);
    // empty string  = false --> formulaBar.value
    if(e.key === "Enter" && inputFormula) {

        //If change in formula ,break old  Parent-Child relation and evaluate new formula
        //then add new parent-child relation 
        // you need to access cellProp Object to know the child and parent relationship linking
        let address = addressBar.value;
        let [cell , cellProp] = getCellAndCellProp(address);
        // check the formula get update or not
        // check current and previous(cellProp.formula) formula are same or not 
        // if different then break the relationship
        // old formula store into the cellProp.formula storage formate property
        // inputFormula = currentFormula
        // cellProp.formula  = oldFormula
        // true(not equal) mean formula change 
        if(inputFormula !== cellProp.formula){
            //break the relationships
            removeChildFromParent(cellProp.formula);
        }

//--------------------------------------------------------------------------------------
        // Now working for Checking is it Cyclic or not ?

        // If not Cyclic then made the relation between them
        // address refer as child address
        // inputFormula access parent cell -> decode and bring from matrix cell
        addChildToGraphComponent(inputFormula,address);
        // true for cycle and false for not-cyclic
        //check formula is cyclic or not, then only evaluate
        // console.log(graphComponentMatrix)
        let isCyclicResponse =  isGraphCyclic(graphComponentMatrix);
        if(isCyclicResponse){
            alert("Your formula is Cyclic");
            
            let response = confirm("Your Formula is Cyclic, Do you want to Trace your Path ?");
            while(response === true){
                //Keep on tracking the color until the user is satisfied.
                // that why we use while loop here for user interaction
                await isGraphCyclicTracePath(graphComponentMatrix,isCyclicResponse); // I want complete full iteration of color tracking so, I will attach wait here also
                // this is for again asking from the user
                response = confirm("Your Formula is Cyclic, Do you want to Trace your Path ?");

            }



            // If Graph is Cyclic then we need to [ break ]  the relation for working correctly
            // Otherwise in the loop it continue run, never complete the task
            removeChildFromGraphComponent(inputFormula, address);
            return;
        }



//--------------------------------------------------------------------------------------------

        //this formula evaluate for the current cell only
        // console.log(evaluateFormula , inputFormula , "  this is both ans");
        let evaluatedValue = evaluateFormula(inputFormula);
        // console.log(`want to look it ${evaluatedValue} and IF ${inputFormula} `);

//-------------------------------------------------------------------------------------------------  


        // to update UI and cellProp(data) in database
        setCellUIAndCellProp(evaluatedValue, inputFormula, address);
        // Establish Parent and children relationship between them
        addChildToParent(inputFormula);
        // console.log(sheetDB , " show the SheetDB "); //WORKING FINE

        // this is the function handle the tree relationship between them
        updateChildrenCells(address);
    }
})



// function for making cyclic Parent-Child Relation...
function addChildToGraphComponent(formula,childAddress){
    //decoded --> child
    let [childRowId , childColumnId] = decodeRIdCIdFromAddress(childAddress); //this will come with decodeValue
    // through formula i have to decode parent details
    let encodedFormula = formula.split(" "); 
    for(let i = 0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);

        if(asciiValue >= 65 && asciiValue <= 90){
            // decoded to access cell and property --> parent
            let[parentRowId, parentColumnId] = decodeRIdCIdFromAddress(encodedFormula[i]);
            // B1: A1 + 10
            // A1 get decoded as [0,0]
            // then go to the cycleValidation.js file and find 2-d matrix cell
            // then push children in them
            // this is relationship formed 
            graphComponentMatrix[parentRowId][parentColumnId].push([childRowId,childColumnId]);
        }
    }
}


// function for making cyclic remove the child from the graphComponent for Making the chain break! 
function removeChildFromGraphComponent(formula, childAddress){
    let [childRowId, childColumnId ] = decodeRIdCIdFromAddress(childAddress);
    let encodedFormula = formula.split(" ");

    for(let i = 0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);

        if(asciiValue >= 65 && asciiValue <= 90){
            // decoded to access cell and property --> parent
            let[parentRowId, parentColumnId] = decodeRIdCIdFromAddress(encodedFormula[i]);
     //  let Example: B1: A1 + 10
    //                A1 get decoded as [0,0]

            // then go to the cycleValidation.js file and find 2-d matrix cell
            // then pop children from them
            // this is relationship break or remove the last Detected-Cyclic form
            graphComponentMatrix[parentRowId][parentColumnId].pop();
        }
    }


}




//here we are updating the children cell after new Parent-child relationship
function updateChildrenCells(newParentAddress){

    //need to fetch parent property
    let [newParentCell , newParentCellProp] = getCellAndCellProp(newParentAddress);
    // the formula which Enter into the bar save to the cell as child
    let children = newParentCellProp.children;

    // I have array children so i have to perform functionality Recursively
    for(let i = 0; i < children.length; i++){
        //in children[] array we store child address 
        let childAddress = children[i];
        console.log(" this is childAddress " , childAddress);
        let [childCell , childCellProp] = getCellAndCellProp(childAddress);
        //find child formula
        let newChildFormula = childCellProp.formula;
        
        //now Evaluate -> Update -> NextProcess
        let evaluatedNewValue = evaluateFormula(newChildFormula);
        //UI and Data base need to update
        setCellUIAndCellProp(evaluatedNewValue , newChildFormula , childAddress);
        //Recursively Work 
        // now need to work for children(became parent some day) ---> children
        updateChildrenCells(childAddress);// this will work recursively
    } 
    // return
}




// Establish Parent and children relationship between them
function addChildToParent(parentFormula){
    let childAddress = addressBar.value; //this is the current address value
    //need to split and make it into the array
    let encodedFormula = parentFormula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++ ){
        // ascii value check -> get string change into number
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if( asciiValue >= 65 && asciiValue <=90 ){
            //first we have to decode then we can take cell and it's property
            let [parentCell , parentCellProp] = getCellAndCellProp(encodedFormula[i]);
            //here in children array we push current address of particular cell
            parentCellProp.children.push(childAddress);
        }
    }
}



// this function help breaking the bond between child and parent
// then linking the new update parent as for the formula driven child and parent relationship
function removeChildFromParent(childFormula){
    let childAddress = addressBar.value; //this is the current address value
    //need to split and make it into the array
    let encodedFormula = childFormula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++ ){
        // ascii value check -> get string change into number
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if( asciiValue >= 65 && asciiValue <= 90 ){
            //first we have to decode then we can take cell and it's property
            let [parentCell , parentCellProp] = getCellAndCellProp(encodedFormula[i]);
            // find index in the parent = { children: [] } find idx lie , them then break the connection
            let idx = parentCellProp.children.indexOf(childAddress);
            //splice help in removing the value from the array
            parentCellProp.children.splice(idx,1);//remove the 1 element

        }
    }
}



// for Evaluation formula and return the value from it
// formulaPass is the addressBar.value
function evaluateFormula(inputFormula){  
    // formulaPass is encoded value then this should be decoded via this to find it
    // formulaPass should be split so that it can be separated and easily detected
    // split in the form of array
    let encodedFormula = inputFormula.split(" ");
    // console.log(encodedFormula, " now this is an array");
    for(let i = 0; i < encodedFormula.length; i++){
        // ascii value check -> get string change into number
        let asciiValue = encodedFormula[i].charCodeAt(0);
        // if this is true mean dependency value mean cell Address
        if(asciiValue >= 65 && asciiValue <= 90){
            // now we have to decode and then we can access the value from it\
            let [cell , cellProp] = getCellAndCellProp(encodedFormula[i]);
            // console.log(cellProp.value , " cellProp value is Answer");
            encodedFormula[i] =  cellProp.value;
        }
    }
    //this is doing for handling string as well number formation
    let decodedFormula = encodedFormula.join(" ");
    // console.log(decodedFormula , " this is the decoded formula");
    // eval mean evaluation of math 
    // eval always take string representation
    return eval(decodedFormula);
}



// now UI and data function for Update things
//data will get update as well as UI
function setCellUIAndCellProp(evaluatedValue , formulaPass , address){
    // let address = addressBar.value; 
    let [cell , cellProp] = getCellAndCellProp(address);
    // UI update
    cell.innerText = evaluatedValue;
    // data update - > storage update -> respective cells
    cellProp.value = evaluatedValue;
    cellProp.formula = formulaPass; // formula store in the [cellProp.formula] property 
}