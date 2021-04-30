let pr = document.getElementById("productRow");
let cr = document.getElementById("categoryRow");
let products;
var prodID = "";
var categoryPressed = "";
let category;

getProducts();

function categoryButtonEvent() {
    localStorage.setItem('category', categoryPressed);
    window.location.href = "category.html";
}

function productImageEvent() {
    console.log(prodID);
    localStorage.setItem('productPressed', prodID);

    window.location.href = "product.html?id="+prodID;
}

function cartButtonEvent() {
    window.location.href = 'cart.html';
}

function addToCart(id) {
    let cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    let newProduct = true;
    cartProducts.forEach(product => {
        if(product.id == id){
            newProduct = false;
            alert('Produkten ligger redan i varukorgen');
        }
    });
    if(newProduct){
        products.forEach(product => {
            if(product.id == id){
                product.quantity = 1;
                cartProducts.push(product);
            }
        });
    }

    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    cartButton.innerHTML = `<i class="bi bi-cart"></i> Varukorg (${cartProducts.length})`;
}

//Fetching all products from api, saves them, and call all functions to populate info.
function getProducts() {


    let categoryLocal2 = localStorage.getItem('category');

    var hashStr = categoryLocal2;
    var [firstHalf, secondHalf] = hashStr.split("-");

let url = 'https://hakimlivsdb.herokuapp.com/product/get/productWcategory/' + firstHalf;

    fetch(url)
    .then((response) => response.json())
    .then(function(data) {
        products = data;
        products.filter(e => {
            
                populateProductColumns(e);
              
        });

        addEventToButtons(products);
    })
}


function populateProductColumns(product) {
    let divElement = document.createElement("div");
    divElement.className = "col-md-3 pb-5";
    divElement.innerHTML = `<div class="my-3 ms-2 text-center"><image class="productImage" src="${product.imageURL}" alt="Produktbild"> <p class="lead text-danger fs-2 fw-bold">${product.price}kr</p> <p class="fw-bold">${product.name}</p><button type="button" id="${product.name}" class="buyButton btn btn-outline-success" onclick="addToCart(${product.id})">Lägg i varukorg</button><hr></div>`;
    pr.appendChild(divElement);
}

function addEventToButtons(productsArray) {
    
    //Product image
    Array.from(document.getElementsByClassName("productImage")).forEach(function(element) {
        element.addEventListener('click', function(obj) {
            productsArray.forEach(product => {
                if(product.image == obj.target.src) {
                    prodID = product.id;
                    productImageEvent();
                }
            })
        })
    })
}

populateCategoryColumns();

function populateCategoryColumns() {   
   let categoryLocal = localStorage.getItem('category');

   var hashStr = categoryLocal;
   var [firstHalf, secondHalf] = hashStr.split("-");

    var divElement = document.createElement("div");
    divElement.className = "col-sm-12 text-center";
    divElement.innerHTML = '<h1 style = "color:#0B3C49; background: white; padding: 25px; font-size: 45px; font-weight: bold;">'+secondHalf+'</h1>';
    
    cr.appendChild(divElement);
}
