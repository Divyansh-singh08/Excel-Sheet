// In this page we will apply cut | copy | past | upload  | download feature


// first we work on selectRange from where to where you have to select 
// for selecting we need to use listener as " ctrl + click " .
//check is ctrlKey is pressed[active] or not !
let ctrlKey;

document.addEventListener("keydown", (e) => {
    //we have some property which help giving in boolean value come -> T/F
    ctrlKey = e.ctrlKey;
})

document.addEventListener("keyup", (e) => {
    //if keyup press mean false else true
    //we have some property which help giving in boolean value come -> T/F
    ctrlKey = e.ctrlKey;
})



// now when we click [ ctrl(press) + "click"(mouse) ] then we select the content(CELL)
// FOR this we need to use EventListener
// DOM tree you have put more then one listener
for(let i = 0; i < rows; i++){
    for(let j = 0; j < columns; j++){
        let cell = document.querySelector(`.cells-box[rowId="${i}"][colId="${j}"]`);
        handleSelectorCells(cell);
    }
}

let rangeStorage = []; // this will store the selectRange index as in array form
function handleSelectorCells(cell){
    cell.addEventListener("click", (e) => {
        // before selecting check is it selected or not ?
        if(!ctrlKey) return;
        // Select cells Range work under 2-cells 
        if(rangeStorage.length >= 2) {
            // for selecting the cell more then one time 
            // we write in function for this functionality
            defaultSelectedCellsUI();
            // by default it only allow max - 2 cell to select at a time
            rangeStorage = [];
            
        }

        // UI indication that this is selected cell by making it as a green color
        cell.style.border = "3px solid #218c74";

        // which cell we click need to find it's roId,coId
        let roId = Number(cell.getAttribute("rowId"));
        let colId = Number(cell.getAttribute("colId"));

        rangeStorage.push([roId,colId]); // push into the main array
        // console.log(rangeStorage, " this is range storage");
    })
}


function defaultSelectedCellsUI(){

    //first range find
    for(let i = 0; i < rangeStorage.length; i++){
        // first need to access index of the rangeStorage array from index then find --> rangeValue
        let cell = document.querySelector(`.cells-box[rowId="${rangeStorage[i][0]}"][colId="${rangeStorage[i][1]}"]`);

        //now need to remove the border  for  that unselect it by making border light
        cell.style.border = "1px solid lightgrey";
    }
}



// Now working on COPY / PASTE / CUT 

// ************************ COPY ************************

let copyBtn = document.querySelector(".copy");
let cutBtn = document.querySelector(".cut");
let pasteBtn = document.querySelector(".paste");

//data copy
// for copying data we need some storage
let copyStorageData = [];
copyBtn.addEventListener("click", (e) => {
    //only able to copy when you select more then one cell and less then 3 cells
    // mean that you selected only one index or cell
    if(rangeStorage.length < 2){
        return;
    }
    // making copyStorageData as empty bcz for new copy at every click 
    copyStorageData = [];

    // rangeStorage[0]--> selecting cell [0]--> selecting Rid/Cid
    // rangeStorage[1][0] ---> next Row tak
    let startRow = rangeStorage[0][0];
    // console.log(startRow , " StartRow ");
    let startCol = rangeStorage[0][1];
    // console.log(startCol , " startCol ");
    let endRow = rangeStorage[1][0];
    // console.log(endRow , " endRow ");
    let endCol = rangeStorage[1][1];
    // console.log(endCol , " endCol ");

    // copy is done via 2-D matrix pattern
    for(let i = startRow; i <= endRow; i++){
        let copyRow = []; // this is the inner array inside big array container
        // column range picking
        for(let j = startCol; j <= endCol; j++){
            // take the data from SheetDB
            let cellProp = sheetDB[i][j];
            copyRow.push(cellProp);
        }
        copyStorageData.push(copyRow);
    }
    // console.log(copyStorageData , " data is showing ");
    defaultSelectedCellsUI(); // to remove the UI from the cell after not selected
})






// ******************* CUT **************************
cutBtn.addEventListener("click", (e) => {

    if(rangeStorage.length < 2) return;
    // rangeStorage[0]--> selecting cell [0]--> selecting Rid/Cid
    // rangeStorage[1][0] ---> next Row tak
    let [startRow,startCol,endRow,endCol] = [ rangeStorage[0][0],rangeStorage[0][1],rangeStorage[1][0],rangeStorage[1][1] ];

    // copy is done via 2-D matrix pattern
    for(let i = startRow; i <= endRow; i++){
        // column range picking
        for(let j = startCol; j <= endCol; j++){
            let cell = document.querySelector(`.cells-box[rowId="${i}"][colId="${j}"]`);

            // take the data from SheetDB
            let cellProp = sheetDB[i][j];
            cellProp.value = "";
            cellProp.bold = false;
            cellProp.italic = false;
            cellProp.underline = false;
            cellProp.fontSize = 14;
            cellProp.fontFamily = "monospace";
            cellProp.fontColor = "#000000";
            cellProp.alignment = "left";
            cellProp.fontBg = "#000000";

            //UI change
            cell.click();

        }
    }
    // console.log(copyStorageData , " data is showing ");
    defaultSelectedCellsUI(); // to remove the UI from the cell after not selected
})




// *********************** PASTE ****************************
//      PASTE - functionality applied

pasteBtn.addEventListener("click" , (e) => {
    // mean that you selected only one index or cell
    if(rangeStorage.length < 2){
        return;
    }

    // Paste cell Data value work
    // [startRow][startColumn]  ----||---- [endRow][endColumn]
    let rowDifference = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]); // row difference
    let colDifference = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]); // col difference


    // taking the address of cell to take the value of the cell from the addressBar
    let address = addressBar.value;
    console.log(address , " is visible");
    //Target
    let [targetStRow , targetStCol] = decodeRIdCIdFromAddress(address);
    console.log(targetStRow , targetStCol , " this is ans ");


    for(let  i = targetStRow, r = 0; i <= targetStRow + rowDifference; i++ , r++){
        for(let j = targetStCol, c = 0; j <= targetStCol + colDifference; j++ , c++){
            let cell = document.querySelector(`.cells-box[rowId="${i}"][colId="${j}"]`);
            if(!cell){
                continue;
            }
            // DB update in paste case
            let cellProp = sheetDB[i][j];
            // **** UI ***
            //if cell exit then move forward other wise print that much what place left
            // r --> refers copyStorageData row
            // c --> refers copyStorageData col
            let dataPaste = copyStorageData[r][c];
            cellProp.value = dataPaste.value;
            cellProp.bold = dataPaste.bold;
            cellProp.italic = dataPaste.italic;
            cellProp.underline = dataPaste.underline;
            cellProp.fontSize = dataPaste.fontSize;
            cellProp.fontFamily = dataPaste.fontFamily;
            cellProp.fontColor = dataPaste.fontColor;
            cellProp.alignment = dataPaste.alignment;
            cellProp.fontBg = dataPaste.fontBg;

            // UI data change by just clicking to the cell
            cell.click();

        }
    }
})