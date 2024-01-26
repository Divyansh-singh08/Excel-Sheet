// now start making the grid via Dynamic filling of the grid with using DOM elements

let rows = 100;
let columns = 26; //bcz [A----Z is totals 36 only]


// first work on column(rows)[1 to 100] filling into the div
// this is represent the row but we say it as a columns(due to verticals looks)
let address_Column_Cont = document.querySelector(".address-column-cont");
//adding the all rows to it
for(let i = 0; i < rows; i++){
    // first i need to create the div then need to fill into the grid-cont(column container)
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class", "address-col");
    addressCol.innerText = i + 1;
    address_Column_Cont.appendChild(addressCol);
}



// now work on the row (column)[A to Z] filles into the div
let address_Row_Cont = document.querySelector(".address-row-cont");
// adding the all columns in A to Z
for(let i = 0; i < columns; i++){
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class", "address-rows");
    addressRow.innerText = String.fromCharCode(65 + i);
    address_Row_Cont.appendChild(addressRow);
}

// Now making the final Grid in the contents in the Excel sheets
let cellsContainer = document.querySelector(".cells-cont");
// cellsContainer(div) ----> rowContainer(div) -----> cells(div)
// .cells-cont ---> .rowCont ---> .cells-box

// first make row containers
for(let i = 0; i < rows; i++){
    // create one row container and then add 26 cells container to it. 
    let rowContainer = document.createElement("div");
    // all rows are block level so need to make display flex
    //make setAttribute
    // rowContainer[div] ----> cells[div] inside it
    rowContainer.setAttribute("class","rowCont");
    for(let j = 0; j < columns; j++){
        let cells = document.createElement("div");
        // to visible in the content must give some style
        cells.setAttribute("class","cells-box");
        // want to make our cells editable by clicking then use
        //some property
        cells.setAttribute("contenteditable","true");
        
        cells.setAttribute("spellcheck", "false");
        // for attributes cells and storage identification --> putting on cells
        cells.setAttribute("rowID", i);
        cells.setAttribute("colID", j);

        rowContainer.appendChild(cells);
        // Now if we click on the some cells then we should be able to see the address field
        //so we use function programming 
        //create a function and send the cells,i,j to it!!!
        addListenerForAddressBarDisplay(cells , i , j);  
    }
    // now rowContainer must be added to the cellsContainer(cells-cont).
    cellsContainer.appendChild(rowContainer);
}

//make one address bar 
// this will show the which row and column will be clicked on it!
let addressBar = document.querySelector(".address-bar");

function addListenerForAddressBarDisplay(cells , iIndex , jIndex){    
    cells.addEventListener("click",(e)=>{
        // need to do row/column manipulation
        // first access column
        let rowId = iIndex + 1;
        //second the  row access -> CONVERT the number into the characters
        let columnId = String.fromCharCode(65 + jIndex);
        addressBar.value = `${columnId}${rowId}`;
    })
}



