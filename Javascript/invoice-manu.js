
let table_items = document.querySelector('#table-items');
let btnAddRow = document.querySelector('#addRow')
let btnDeleteRow = document.querySelectorAll('#deleteRow');
let item = document.querySelectorAll('#item');
let unitCost = document.querySelectorAll('#unitCost');
let lineTotal = document.querySelectorAll('#lineTotal');
let quantity = document.querySelectorAll('#quantity');
let download = document.querySelector('#download');
let invoice = document.querySelector('.invoice');
let cashier_name= document.querySelector('#cashier-name');
let cashier_email= document.querySelector('#cashier-email');
let cashier_address= document.querySelector('#cashier-address');
let client_name= document.querySelector('#client-name');
let client_email= document.querySelector('#client-email');
let client_address= document.querySelector('#client-address');
let inputSubtotal = document.querySelector('#subtotal');
let inputTax = document.querySelector("#tax");
let inputDiscount = document.querySelector('#discount');
let inputTotal = document.querySelector("#total"); 



/**************************************************************************** */
 
function generatePDF() {
  // Get the values of the input fields
  let itemArray=[];
  let inputItem = document.querySelectorAll('#inputItem');
  inputItem.forEach(element =>{
         itemArray.push(element.value);
     });
     console.log(itemArray);
  let InputUnitCost = document.querySelectorAll('#inpuUnitCost');
  let unitCostArray=[];
  InputUnitCost.forEach(element =>{
    unitCostArray.push(element.value);
     });
     console.log(unitCostArray);
  let inputlineTotal = document.querySelectorAll('#inputLineTotal');
  let lineTotalArray=[];
  inputlineTotal.forEach(element =>{
    lineTotalArray.push(element.value);
     });
     console.log(lineTotalArray);
  let inputQuantity = document.querySelectorAll('#inputQuantity');
  let quantityArray=[];
  inputQuantity.forEach(element =>{
    quantityArray.push(element.value);
     });
     console.log(quantityArray);

     /********************/
     var data = [];
     itemArray.forEach((element,index) =>{
          data.push( [element , unitCostArray[index] , quantityArray[index] , lineTotalArray[index]])
     })
     data.unshift(["Item","Unit cost","Quantity","Line total"]);
/********************* */

   // Create a new jsPDF instance
   var doc = new jsPDF();

   // Add a title to the document
   var pagewidth = doc.internal.pageSize.width;
   console.log(pagewidth)
   doc.setFontSize(10);
   doc.text('Creation date : 28/04/2023', 10, 10);
    doc.text('invoice N°: 0015', 85, 50);
    doc.line(10, 57, 200, 57);
   doc.text(`From: ${cashier_name.value}`, 10, 20);
   doc.text(`Email: ${cashier_email.value}`, 10, 30);
   doc.text(`Address: ${cashier_address.value}`, 10, 40);
   doc.text(`To mr: ${client_name.value} `, 130, 20);
   doc.text(`Email: ${client_email.value}`, 130, 30);
   doc.text(`Address: ${client_address.value}`, 130, 40);
   doc.autoTable({
    head: [data[0]],
    body: data.slice(1),
    margin: { top: 60  }
  });
  var tableHeight = doc.autoTable.previous.finalY;
  // Add the subsequent content at an adjusted y-coordinate
  doc.text('This text will always appear below the table', 10, tableHeight + 20);

    doc.save('invoice')
};

download.addEventListener("click",generatePDF)

/*************************************************************************** */

/*************************************************************************** */
function addRow() {
  // Clone the last row of the table
  const lastRow = table_items.rows[table_items.rows.length - 1];
  const newRow = lastRow.cloneNode(true);
  // Clear the input values in the new row
  const inputs = newRow.querySelectorAll('input');
  console.log(inputs)
  inputs.forEach(input => input.value = '');
  // Insert the new row into the table
  table_items.appendChild(newRow);
}
btnAddRow.addEventListener("click", addRow);


function deleteRow(e) {
  btnDeleteRow = document.querySelectorAll('#deleteRow')
  btnDeleteRow.forEach(element => {
    element.addEventListener("click", deleteRow);
  })
   if(e !=undefined){
 // Get the row to be deleted
 const row = e.target.closest('tr');

// Check if the row is not the first row
if (table_items.rows.length > 2) {
 // Delete the row
 row.parentNode.removeChild(row);
}
   }
 
}
setInterval(deleteRow, 600);



  function calcLineTotal(e){
    unitCost = document.querySelectorAll('#unitCost');
    unitCost.forEach(element => {
      element.addEventListener("keyup", calcLineTotal);
 })
 /****************/ 
 quantity = document.querySelectorAll('#quantity');
 quantity.forEach(element => {
   element.addEventListener("keyup", calcLineTotal);
})
 /**************/
          if( e != undefined){
            let parendelement = e.target.parentNode.parentNode;
          if( e.target.getAttribute('id')!="inputQuantity"){
            parendelement.querySelector('#lineTotal').childNodes[0].value = (e.target.value * parendelement.querySelector('#quantity').childNodes[0].value);
            
          }else{
            parendelement.querySelector('#lineTotal').childNodes[0].value = (e.target.value * parendelement.querySelector('#unitCost').childNodes[0].value);
            
  
          }
          }
          
   }
   setInterval(calcLineTotal, 600);
  


/*************************************************** */
             /***********CALCULE TAX & DISCOUNT ********** */
             
function calcule_Tax_Discount(){
     let subtotalvalue = 0;
      let inputLineTotal = document.querySelectorAll('#inputLineTotal');  
                inputLineTotal.forEach(element=>{
                  subtotalvalue = subtotalvalue +  +element.value ;
                })
                inputSubtotal.value=subtotalvalue; 
      inputTotal.value = subtotalvalue + (subtotalvalue*(+inputTax.value / 100)) - ( subtotalvalue*(+inputDiscount.value / 100) );
   
                
             }

  setInterval(calcule_Tax_Discount , 200); 
/*************************************************** */
/***************************************************** */

document.querySelector("#sendEmail").addEventListener("click",()=>{
  Email.send({
    SecureToken : "8f7e5028-4dcc-4a98-b757-2386290d23f7",
    To : 'amarjaneelmahdi98@gmail.com',
    From : "amarjaneelmahdi03@gmail.com",
    Subject : "This is the subject",
    Body : "And this is the body"
    }).then(
      message => alert(message)
);
})