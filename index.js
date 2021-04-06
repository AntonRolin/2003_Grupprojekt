let loginButton = document.getElementById("loginButton");
let cartButton = document.getElementById("cartButton");
let pr = document.getElementById("productRow");
let cr = document.getElementById("categoryRow");
let products;
let pCategories = [];
let uniqueCategories;
var prodID = "";
var categoryPressed = "";

getProducts();

//cartProducts = [];
localStorage.removeItem('productPressed');
localStorage.removeItem('category');

//Delete later
localStorage.removeItem('cartProducts');

function loginButtonEvent() {

}

function cartButtonEvent() {
    
}

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
        products.forEach(e => {
            populateProductColumns(e);
        });
        getCategories(products);
        addEventToButtons(products);
    })
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
    var divElement = document.createElement("div");
    divElement.className = "col-sm-3";
    divElement.innerHTML = '<div><img class="mw-100 h-100 productImage" src="'+product.image+'"alt=""></div><div><p>'+product.price+'$</p></div><div><p>'+product.name+'</p></div><div><button type="button" id="'+product.name+'" class="buyButton btn btn-secondary btn-block">Köp</button></div>';

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
    divElement.className = "col-sm-2 text-center";
    divElement.innerHTML = '<button type="button" id="'+category+'" class="catButton btn btn-secondary btn-box">'+category+'</button>';

    cr.appendChild(divElement);
}
