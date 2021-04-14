let pr = document.getElementById("productRow");
let cr = document.getElementById("categoryRow");
let products;
let pCategories = [];
let uniqueCategories;
var prodID = "";
var categoryPressed = "";
let category;

getProducts();

function addToCart(productToCart) {
    saveProductsToCartInLocalstorage(productToCart);
}

function categoryButtonEvent() {
    localStorage.setItem('category', categoryPressed);
    window.location.href = "category.html";
}

function productImageEvent() {
    console.log(prodID);
    localStorage.setItem('productPressed', prodID);

    window.location.href = "product.html";
}

function saveProductsToCartInLocalstorage(value) {
    if(!window.localStorage) alert("Problem, too old browser")
    else {
        var localArray = JSON.parse(localStorage.getItem('cartProducts') || '[]');
        localArray.push(value);
        localStorage.setItem('cartProducts', JSON.stringify(localArray));
        console.log('localArray' + localArray);
    }
}

//Fetching all products from api, saves them, and call all functions to populate info.
function getProducts() {
    fetch('productAPI.json')
    .then((response) => response.json())
    .then(function(data) {
        products = data;
        products.filter(e => {
            if(e.category === localStorage.getItem('category')){
                populateProductColumns(e);
            }   
        });

        addEventToButtons(products);
    })
}

function populateProductColumns(product) {
    var divElement = document.createElement("div");
    divElement.className = "col-md-3 pb-5";
    divElement.innerHTML = '<div><img class="productImage" src="'+product.image+'"alt=""></div><div><p>'+product.price+'$</p></div><div><p>'+product.name+'</p></div><div><button type="button" id="'+product.name+'" class="buyButton btn btn-success btn-block">Köp</button></div>';

    pr.appendChild(divElement);

}

function addEventToButtons(productsArray) {
    //Buy button
    Array.from(document.getElementsByClassName("buyButton")).forEach(function(element) {
        element.addEventListener('click', function(obj) {
            productsArray.forEach(product => {
                if(product.name == obj.target.id) {
                    addToCart(product);
                }
            });
            
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

populateCategoryColumns();

function populateCategoryColumns() {   
   let categoryLocal = localStorage.getItem('category');
    var divElement = document.createElement("div");
    divElement.className = "col-sm-12 text-center";
    divElement.innerHTML = '<h1 style = "color:#0B3C49; background: white; padding: 25px; font-size: 45px; font-weight: bold;">'+categoryLocal+'</h1>';
    
    cr.appendChild(divElement);
}
