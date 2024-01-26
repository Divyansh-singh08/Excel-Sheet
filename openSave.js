// **********  This page basically handling the Open and Save to the file......


let downloadBtnFile = document.querySelector(".download");
let uploadBtnFile = document.querySelector(".upload");


// download Task done here....
downloadBtnFile.addEventListener("click", (e) => {
    let jsonDataInfo = JSON.stringify([sheetDB , graphComponentMatrix]);
    // blob will help making easily download bcz it make file in small formate
    let file = new Blob([jsonDataInfo], { type: "application/json" });
    //help in taking out link form the URL
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "SheetData.json";
    a.click();
})


//upload Task in excel 
uploadBtnFile.addEventListener("click", (e)=>{
    // it will be created dynamically via javascript
    let input = document.createElement("input");
    input.setAttribute("type" , "file");
    // open file explorer
    input.click();

    input.addEventListener("change", (e) => {
        // new instance created
        let fr = new FileReader();
        let files = input.files; // only single file will be access_able
        let fileObject = files[0];

        fr.readAsText(fileObject);
        fr.addEventListener("load", (e) => {
            // read the sheet cont
            let readSheetData = JSON.parse(fr.result);
            // now need to display in the excel-sheet
            // data always upload in new sheets
            addSheetBtn.click(); // basic sheet with default data will be create


            //sheetDB, graphComponent
            sheetDB = readSheetData[0];
            graphComponentMatrix = readSheetData[1];
            
            Total_collectedSheetDB[Total_collectedSheetDB.length-1] = sheetDB;
            Total_collectedGraphComponent[Total_collectedGraphComponent.length - 1] = graphComponentMatrix;

            handleSheetDataProperty(); 
        })
    })
})
