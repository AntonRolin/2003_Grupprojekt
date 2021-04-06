let loginButton = document.getElementById("loginButton");
let cartButton = document.getElementById("cartButton");
let pr = document.getElementById("productRow");
let cr = document.getElementById("categoryRow");
let products;
let pCategories = [];
let uniqueCategories;
let cartProducts = [];
var prodID = "";
var catID = "";

getProducts();

//Delete later
cartProducts = [];
localStorage.clear();

function loginButtonEvent() {
    
}

function cartButtonEvent() {
    
}

function addToCart(productToCart) {
    cartProducts.push(productToCart);
    saveProdArrToLocal(productToCart);
}

function categoryButtonEvent() {
    //create and save params to internal with key categoryPressed.
    localStorage.setItem('category', catID);

    //TODO-ADD CATEGORY LOCATION HERE
    window.location.href = "";
}

function productImageEvent(element) {
    localStorage.setItem('productPressed', element.id);

    window.location.href = "";
}

function saveProdArrToLocal(value) {
    if(!window.localStorage) alert("Problem, too old browser")
    else {
        var localArray = JSON.parse(localStorage.getItem('cartProducts') || '[]');
        localArray.push(value);
        localStorage.setItem('cartProducts', JSON.stringify(localArray));
        console.log('localArray' + localArray);
    }
}

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
    Array.from(document.getElementsByClassName("buyButton")).forEach(function(element) {
        element.addEventListener('click', function(obj) {
            productsArray.forEach(product => {
                if(product.name == obj.target.id) {
                    prodID = obj.target.id;
                    addToCart(product);
                }
            });
            
        })
    })

    Array.from(document.getElementsByClassName("catButton")).forEach(function(element) {
        element.addEventListener('click', function(obj) {
            catID = obj.target.id;
            categoryButtonEvent();
        })
    })

    Array.from(document.getElementsByClassName("productImage")).forEach(function(element) {
        element.addEventListener('click', function(obj) {
            productsArray.forEach(product => {
                if(product.image == obj.target.src) {
                    productImageEvent(product);
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

