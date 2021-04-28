let pr = document.getElementById("productRow");
let cr = document.getElementById("categoryRow");
let products = [];
let pCategories = [];
let uniqueCategories;
var prodID = "";
var categoryPressed = "";

getProducts();

localStorage.removeItem('category');

function categoryButtonEvent() {
    localStorage.setItem('category', categoryPressed);
    window.location.href = "category.html";
}

function productImageEvent() {
    console.log(prodID);
    /* localStorage.setItem('productPressed', prodID); */

    window.location.href = "product.html?id="+prodID;
}

function addToCart(id) {
        if(localStorage.getItem('cartProducts') == null)
            localStorage.setItem('cartProducts', JSON.stringify([]));

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
    fetch('productAPI.json')
    .then((response) => response.json())
    .then(function(data) {
        products = data;
        products.forEach(e => {
            populateProductColumns(e);
        });
        getCategories(products);
        addEventToButtons(products);
    })
    if(localStorage.getItem('cartProducts') == undefined){

    }
}

//Get all categories and filter then by unique
function getCategories(products) {
    products.forEach(e => {
        pCategories.push(e.category);
    });
    uniqueCategories = filterCategory(pCategories);

    uniqueCategories.forEach(element => {
        populateCategoryColumns(element);
    });
}

function populateProductColumns(product) {
    let divElement = document.createElement("div");
    divElement.className = "col-md-3 pb-5";
    divElement.innerHTML = `<div class="my-3 ms-2 text-center"><image class="productImage" src="${product.image}" alt="Produktbild"> <p class="lead text-danger fs-2 fw-bold">${product.price}kr</p> <p class="fw-bold">${product.name}</p><button type="button" id="${product.name}" class="buyButton btn btn-outline-success" onclick="addToCart(${product.id})">Lägg i varukorg</button><hr></div>`;
    pr.appendChild(divElement);
}


function addEventToButtons(productsArray) {

    //Category
    Array.from(document.getElementsByClassName("catButton")).forEach(function(element) {
        element.addEventListener('click', function(obj) {
            categoryPressed = obj.target.id;
            categoryButtonEvent();
        })
    })

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

function filterCategory(arrayToFilter) {
    uniqueCategories = arrayToFilter.filter((v, i, a) => a.indexOf(v) === i);

    return uniqueCategories;
}

function populateCategoryColumns(category) {
    var divElement = document.createElement("div");
    divElement.className = "col-sm-2 text-center my-3 ms-4";
    divElement.innerHTML = '<button type="button" id="'+category+'" class="catButton btn btn-outline-dark">'+category+'</button>';

    cr.appendChild(divElement);
}

