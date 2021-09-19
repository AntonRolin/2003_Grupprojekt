let pr = document.getElementById("productRow");
let cr = document.getElementById("categoryRow");
let sr = document.getElementById("sumRow");
let products;
var prodID = "";
var categoryPressed = "";
let category;

populateCategoryColumns();



function getOrderProducts(id) {
    let url5 = 'https://hakimlivsdb.herokuapp.com/product/get/allcustomerorders/' +id
    fetch(url5)
    .then((response) => response.json())
    .then(function(data) {
        products = data;
        products.forEach(e => {
            populateProductColumns(e);
        });
    })
}



function populateProductColumns(product) {
    let divElement = document.createElement("div");
    divElement.className = "col-md-6 sm-20";
    divElement.innerHTML = `<div class="my-3 ms-2 text-center"><image class="productImage" src="${product.imageURL}" alt="Produktbild"> <p class="lead text-danger fs-2 fw-bold">${product.price}kr</p> <p class="fw-bold">${product.name}</p><hr><p class="fw-bold">${product.quantity} st</p><hr></div>`;
    pr.appendChild(divElement);
}




function populateCategoryColumns() {   
   let categoryLocal = localStorage.getItem('orderID');

    var divElement = document.createElement("div");
    divElement.className = "col-sm-12 text-center";
    divElement.innerHTML = '<h1 style = "color:#0B3C49; background: white; padding: 25px; font-size: 45px; font-weight: bold;">Ordernummer: '+categoryLocal+'</h1>';
    
    getOrderProducts(categoryLocal);
    cr.appendChild(divElement);

    getOrderSum(categoryLocal);
    getPaymentStatus(categoryLocal);
}

function getOrderSum(ordersID){

    let url5 = 'https://hakimlivsdb.herokuapp.com/orders/get/orderssum/' + ordersID
    

        axios.get(url5)
        .then(response => {
            this.data = response.data;
            this.data.forEach((item) => {
              console.log("found: ", item)
              console.log("found id: ", item.sum)
              this.populateOrderSum(item.sum);
              
            })
          });

}

function populateOrderSum(sum) {   

 
     var divElement = document.createElement("div");
     divElement.className = "col-sm-12 text-center";
     divElement.innerHTML = '<h1 style = "color:#0B3C49; background: white; padding: 25px; font-size: 45px; font-weight: bold;">Summa: '+sum+'</h1>';
     
     sr.appendChild(divElement);
 
 }

 function getPaymentStatus(ordersID){

    let url = 'https://hakimlivsdb.herokuapp.com/payment/get/status/' + ordersID

     axios.get(url)
         .then(response => {               
             this.populatePaymentStatus(response.body);
             console.log("Response:"+response);
             console.log("Body:"+response.body);
             console.log("toString:"+response.toString());
             console.log("Text:"+response.text);
         });
 }

 function populatePaymentStatus(paymentStatus){
     var divElement = document.createElement("div");
     divElement.className = "col-sm-12 text-center";
     divElement.innerHTML = '<h1 style = "color:#0B3C49; background: white; padding: 25px; font-size: 45px; font-weight: bold;">Status: '+paymentStatus+'</h1>';

     sr.appendChild(divElement);
 }
