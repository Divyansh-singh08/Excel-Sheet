
// All the  



let Total_collectedSheetDB = []; // BIG ARRAY, CONTAINER ALL SHEET_DB 

// //Working on the Storage of the array 
let sheetDB = []; 

//  making the sheet in excel-sheet 
{
    let addSheetBtn = document.querySelector(".sheet-add-icons");
    addSheetBtn.click();
    // handleSheetDataProperty();
}

// //now we will put row and column into the DB vi Dynamic
// // here rows and columns will automatically access it connection will be created via previous connection (grid.js) 
// for(let i = 0; i < rows; i++){
//     // make sheet row -> total 100rows
//     let sheetRow = [];
//     // mine mine column(cell) [look like small box]...
//     for(let j = 0; j < columns; j++){
//         // every cell need to be able to access object --> have object{} applied via cell
//         let cellPropObj = {
//             bold : false,
//             italic : false,
//             underline : false,
//             alignment: "left",
//             fontFamily: "monospace",
//             fontSize: "14",
//             fontColor: "#000000",
//             bgColor: "#000000", //just for indication purpose default value
//             value: "", //any cell value will be store in the value -> key this come from cellProp
//             formula: "", // this also need to store formula the remember purpose of calculation
//             children: [], // this is showing parent and child relationship
//         }
//         //add all feature of object(cells) into the sheetRow able to access properties that push
//         // it is applicable to 100rows in all cells
//         sheetRow.push(cellPropObj);
//     }
//     // create basic array to store all row & column properties
//     sheetDB.push(sheetRow);
// }


//selectors for making change in the sheet as per the rule 
//selector for cell properties 
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
// this is in the input section tag contain this class name
let fontColor = document.querySelector(".font-color-prop");
let fontBg = document.querySelector(".bg-color-prop");

// 3 alignment take  left center right
let alignment = document.querySelectorAll(".alignment");
//making split form the alignment to access individual alignment properties
let leftAlign = alignment[0];
// console.log("this is a now leftAlign", leftAlign);
let centerAlign = alignment[1];
let rightAlign = alignment[2];


// access the address-bar tag for cell and storage area
// this is already declared in the previous section
// let addressBar = document.querySelector(".address-bar");

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";




//                               START Coding Points
//-----------------------------------  BOLD  ----------------------------------------------------

// Application of Two-way-Binding
// Now Attached property listeners to all to make it feature working
bold.addEventListener("click", (e)=> {
    //after clicking on the cell we need the address of the cell to make change according to the functionality ,so that we can change UI and the data storage function
    //need to go to the cell address fetch that is active cell address from that tag
    let addressBarValue = addressBar.value; //line 54 come addressBar.value
    // de-structuring
    let[cell,cellProp] = getCellAndCellProp(addressBarValue);

    // Modification steps
    // bold by default it is false(cellProp) make it toggling and change it to true/false(cellProp)
    cellProp.bold = !cellProp.bold; //data change
  // UI change
    cell.style.fontWeight = cellProp.bold ? 'bold' : 'normal';
    // active  to the bold visible state in the UI ---> in cellprop-action-cont
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;

})

// ---------------------- Italic -------------------------------------------------

// Now Attached property listeners to all to make it feature working
italic.addEventListener("click", (e)=> {
    //after clicking on the cell we need the address of the cell to make change according to the functionality
    // so that we can change UI and the data storage function
    //need to go to the cell address fetch that is active cell address from that tag
    let addressBarValue = addressBar.value;
    // de-structuring
    let[cell,cellProp] = getCellAndCellProp(addressBarValue);

    // Modification steps
    // bold by default it is false(cellProp) make it toggling and change it to true/false(cellProp)
    cellProp.italic = !cellProp.italic; //data change
  // UI change
    cell.style.fontStyle = cellProp.italic ? 'italic' : 'normal';
    // active  to the bold visible state in the UI ---> in cellprop-action-cont
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;

})


// -------------------------------------------Underline----------------

// Now Attached property listeners to all to make it feature working
underline.addEventListener("click", (e)=> {
    //after clicking on the cell we need the address of the cell to make change according to the functionality
    // so that we can change UI and the data storage function
    //need to go to the cell address fetch that is active cell address from that tag
    let addressBarValue = addressBar.value;
    // de-structuring
    let[cell,cellProp] = getCellAndCellProp(addressBarValue);

    // Modification steps
    // bold by default it is false(cellProp) make it toggling and change it to true/false(cellProp)
    cellProp.underline = !cellProp.underline; //data change
  // UI change
    cell.style.textDecoration = cellProp.underline ? 'underline' : 'none';
    // active  to the bold visible state in the UI ---> in cellprop-action-cont
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
})


// Font-size

fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    // destructuring the array
    let [cell , cellProp] = getCellAndCellProp(address);

    // modification perform 
    cellProp.fontSize = fontSize.value; //data change 
    // UI change
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})

// FontFamily 

fontFamily.addEventListener("change", (e) => {
    let address = addressBar.value;
    // destructuring the array
    let [cell , cellProp] = getCellAndCellProp(address);

    // modification perform 
    cellProp.fontFamily = fontFamily.value; //data change 
    // UI change
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})


// FontColor
fontColor.addEventListener("change" ,(e) =>{
    let address = addressBar.value;
    // destructuring
    let [cell ,cellProp] = getCellAndCellProp(address);

    // modification
    cellProp.fontColor = fontColor.value;//data change
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
})


// Background color
fontBg.addEventListener("change" ,(e) =>{
    let address = addressBar.value;
    // destructuring
    let [cell ,cellProp] = getCellAndCellProp(address);

    // modification
    cellProp.fontBg = fontBg.value; //data change
    cell.style.backgroundColor = cellProp.fontBg;
    fontBg.value = cellProp.fontBg;
})

// Alignment
// loop to choice each element and perform operation
alignment.forEach((alignmentElement) =>{
    // need to select all element  and  step by step
    alignmentElement.addEventListener("click", (e) =>{
        let address = addressBar.value;
        let [cell , cellProp] = getCellAndCellProp(address);

        // modification 
        let alignValue = e.target.classList[0];
        // console.log(alignValue ," this is the alignValue");
        // data change
        cellProp.alignment = alignValue;
        //db storage value access
        cell.style.textAlign = cellProp.alignment;//UI change --> inner text change
        // UI change  part 2 --> this is look change
        switch(alignValue){
            case "left":
                leftAlign.style.backgroundColor =   activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor =  inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor =   inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor =  inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor =   inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor =  activeColorProp;
                break;

        }

    })
})


// Need to access all cell to put listeners
let allCells = document.querySelectorAll(".cells-box");
// console.log(" allCells listener given here:-  " + allCells);

// loop will run till the 0 to 25 till A to Z (e.g. 26) column
for(let i = 0; i < allCells.length; i++) {
    addListenerToAttachCellProp(allCells[i]);
}

// this is the cell where you perform the function and it show that active functionality
function addListenerToAttachCellProp(cell){
    // make work 
    cell.addEventListener("click" , (e) => {

        // it allows to access all cellProp 
        let address = addressBar.value;
        let[rowId , colId] =  decodeRIdCIdFromAddress(address);
        let cellProp = sheetDB[rowId][colId];

        // we want to apply to the cell properties
        // Apply UI to cell property
        cell.style.fontWeight = cellProp.bold ? 'bold' : 'normal';
        cell.style.fontStyle = cellProp.italic ? 'italic' : 'normal';
        cell.style.textDecoration = cellProp.underline ? 'underline' : 'none';
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.fontBg === "#000000" ? "transparent" : cellProp.fontBg;
        cell.style.textAlign = cellProp.alignment;

        

        // Apply Properties UI Props container 
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;
        fontColor.value = cellProp.fontColor;
        fontBg.value = cellProp.fontBg;
        switch(cellProp.alignment){
            case "left":
                leftAlign.style.backgroundColor =   activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor =  inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor =   inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor =  inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor =   inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor =  activeColorProp;
                break;
        }

         // When any we click on any cell then formula bar also get change according to the cell
        let formulaBar = document.querySelector(".formula-bar");
        formulaBar.value = cellProp.formula;
        cell.innerText = cellProp.value;
    })
}

// this function help me in extraction and be able to give cell node as well as storage inside object{} present 
// then return cell and cellProp
function getCellAndCellProp(addressBarValue){
    // doing de-structuring the array here
    let [rowId,colId] =  decodeRIdCIdFromAddress(addressBarValue);
    // access to the cell and storage object ---> access to the which rowId and columnId in the sheet
    let cell = document.querySelector(`.cells-box[rowId="${rowId}"][colId="${colId}"]`);
    let cellProp = sheetDB[rowId][colId];
    // two-way-binding
    // now finally return active(clicked) cell(node)UI and cellProp(DB)data
    return [cell , cellProp];
}


// to take  here we need rowID and columnID for that we decode the addressBar
function  decodeRIdCIdFromAddress(address){
    // take address input and decode and then it will pass nowId and columnID
    // address -> "A1" here----> "A" is column and "1" is Row 
    // we get the value in string formate then we convert into the Number type using Number()
    let rowId = Number(address.slice(1) - 1); // [ 1 => "0"th row] ----> it will take from index 1 to all
    // you need to convert the String into the Number type so that u can use column in the number
    // string(address) ----> ascii value Number ---> then make neutral value do -65 from it.
    let colId = Number(address.charCodeAt(0)) - 65; // ["A" -> get ascii value 65]
    // return in th form of matrix in number format
    return [rowId, colId];
}
