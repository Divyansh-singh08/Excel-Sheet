// This is the for the sheet Handling logical Code in the corner end left side as button clickable


let activeSheetColor = "#ced6e0";
//1. storage 

//
let sheetFolderContainer = document.querySelector(".sheets-folder-cont");
// fetching the  dom tree and creating Sheet when we click 
let addSheetBtn = document.querySelector(".sheet-add-icons");


// this function with EvenListener we create sheet by clicking Dynamically
addSheetBtn.addEventListener("click" , (e) => {
    //create sheet content --- "div"
    let sheetDiv = document.createElement("div");
    sheetDiv.setAttribute("class" , "sheet-folder");

    // all sheet folder i will access from here
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    // console.log("length of allSheetFolder" , allSheetFolders.length , allSheetFolders); 
    // then set the attribute Id
    sheetDiv.setAttribute("id", allSheetFolders.length); // NO sheet mean 0 base index

    // here we setting the innerHTML of sheetDiv 
    // when we click to the div we get it...
    sheetDiv.innerHTML = `
        <div class="sheet-content">Sheet ${ allSheetFolders.length + 1 }</div>
    `;

    // now put all sheet into the sheet-container-folder
    sheetFolderContainer.appendChild(sheetDiv);
    sheetDiv.scrollIntoView(); // this will bring in visibility
    // DB storage perform
    createSheet_StorageDB__with_UI_Data();
    createGraphComponentMatrix();
    // now sheetManage when eventClick 
    handleSheetActiveness(sheetDiv);
    // sheet need to remove
    handleSheetRemove(sheetDiv);
    sheetDiv.click();

})


function handleSheetRemove(sheetDiv){
    // this function help in removing the sheet 
    sheetDiv.addEventListener("mousedown", (e) => {
        // 0 mean left click of mouse // 1 mean scroll bar use // 2 mean right click of mouse
        if(e.button !== 2){
            // right click
            return;
        } 
        
        // atList one sheet we need at any how
        // for that need sheet total length
        let allSheetFolders = document.querySelectorAll(".sheet-folder");
        if(allSheetFolders.length === 1){
            alert("You need to have atleast one sheet ! ");
            return;
        }

        // more then one sheet then remove
        let response = confirm("Your sheet will be removed permanently,Are you sure ? ");
        if(response === false) return;

        let sheetIdx = Number(sheetDiv.getAttribute("id"));

        // this will help in removing from DB-Matrix
        Total_collectedSheetDB.splice(sheetIdx,1);
        Total_collectedGraphComponent.splice(sheetIdx, 1);
        // UI
        handel_sheetUI_Ordering(sheetDiv);

        //By default DB to sheet 1 to (active)
        sheetDB = Total_collectedSheetDB[0];
        graphComponentMatrix = Total_collectedGraphComponent[0];
        handleSheetDataProperty();
    })
}


function handel_sheetUI_Ordering(sheetDiv){
    // now remove the sheet itself for UI
    sheetDiv.remove();
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for(let i = 0; i < allSheetFolders.length; i++){
        allSheetFolders[i].setAttribute("id", i);
        let sheetContent = allSheetFolders[i].querySelector(".sheet-content");
        sheetContent.innerText = `Sheet ${ i + 1 }`;
        allSheetFolders[i].style.backgroundColor = "transparent";
    }

    // first sheet active
    allSheetFolders[0].style.backgroundColor = activeSheetColor;

}



function handleSheetDB(sheetIdx){
    sheetDB = Total_collectedSheetDB[sheetIdx];
    graphComponentMatrix = Total_collectedGraphComponent[sheetIdx]; 
}


function handleSheetDataProperty(){
    for(let  i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            let cell = document.querySelector(`.cells-box[rowId="${i}"][colId="${j}"]`);
            cell.click();
        }
    }

    //By default  user Internal click on first cell of excel sheet
    let firstCell = document.querySelector('.cells-box');
    //clicked through the DOM 
    firstCell.click();
}


function handleSheetUI(sheetDiv){
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for(let i = 0; i < allSheetFolders.length; i++){
        allSheetFolders[i].style.backgroundColor = "transparent";
    }
    sheetDiv.style.backgroundColor = activeSheetColor;
}


function handleSheetActiveness(sheetDiv){
    sheetDiv.addEventListener("click", (e) => {
        let sheetIdx = Number(sheetDiv.getAttribute("id"));
        handleSheetDB(sheetIdx);
        handleSheetDataProperty();
        handleSheetUI(sheetDiv);
        
    })
}




// when we will call this function at the moment we get one new sheet_DB
function createSheet_StorageDB__with_UI_Data(){
    
    // THIS IS ONE SHEET DB
    let sheetDB = []; 
    //now we will put row and column into the DB vi Dynamic
    // here rows and columns will automatically access it connection will be created via previous connection (grid.js) 
    for(let i = 0; i < rows; i++){
        // make sheet row -> total 100rows
        let sheetRow = [];
        // mine mine column(cell) [look like small box]...
        for(let j = 0; j < columns; j++){
            // every cell need to be able to access object --> have object{} applied via cell
            let cellPropObj = {
                bold : false,
                italic : false,
                underline : false,
                alignment: "left",
                fontFamily: "monospace",
                fontSize: "14",
                fontColor: "#000000",
                bgColor: "#000000", //just for indication purpose default value
                value: "", //any cell value will be store in the value -> key this come from cellProp
                formula: "", // this also need to store formula the remember purpose of calculation
                children: [], // this is showing parent and child relationship
            }
            //add all feature of object(cells) into the sheetRow able to access properties that push
            // it is applicable to 100rows in all cells
            sheetRow.push(cellPropObj);
        }
        // create basic array to store all row & column properties
        sheetDB.push(sheetRow);
    }

    // after creating sheetDB then push the sheetDB into the Total_collectedSheetDB
    Total_collectedSheetDB.push(sheetDB);
}



// we making graphComponentMatrix for every sheet all have different relation 
// so we need to create graphComponentMatrix another like sheetDB
// so that no clutter, and easy manageable for which sheet need according to data fetch and perform
function createGraphComponentMatrix(){
    //Applying  Cycle Detection Algorithm and path tracing
    //Work for Storage in 2-D matrix
    let graphComponentMatrix = []; // need 2-D matrixArray

    //2-D matrix
    for(let i = 0; i < rows; i++){
        let rowArray = []; //this will be 100 of rows 
        for(let j = 0; j < columns; j++){
            //this loop target cell property
            //where in cell we add property to it
            //why are array -> more then one child relationship(dependency)
            rowArray.push([]);

        }
        //add rowArray in graph-component matrix -> Bigger Array
        graphComponentMatrix.push(rowArray);
    }

    Total_collectedGraphComponent.push(graphComponentMatrix);

}