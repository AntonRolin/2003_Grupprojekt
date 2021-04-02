let loginButton = document.getElementById("loginButton");
let cartButton = document.getElementById("cartButton");
let pr = document.getElementById("productRow");
let cr = document.getElementById("categoryRow");
let products;
let pCategories = [];
let uniqueCategories;

getProducts();

function loginButtonEvent() {
    
}

function cartButtonEvent() {

}

function addToCart(id) {
    console.log(id);
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

    divElement.innerHTML = '<div><img class="mw-100 h-100" src="'+product.image+'"alt=""></div><div><p>'+product.price+'$</p></div><div><p>'+product.name+'</p></div><div><button type="button" class="btn btn-secondary btn-block" onclick="addToCart("testClick")>Hola</button></div>';

    pr.appendChild(divElement);

}

function filterCategory(arrayToFilter) {
    
    uniqueCategories = arrayToFilter.filter((v, i, a) => a.indexOf(v) === i);

    return uniqueCategories;
}

function populateCategoryColumns(category) {
    
    var divElement = document.createElement("div");
    divElement.className = "col-sm-2 border rounded bg-white text-center";

    divElement.innerHTML = '<a href="" class="text-decoration-none text-dark">'+category+'</a>';

    cr.appendChild(divElement);
}

