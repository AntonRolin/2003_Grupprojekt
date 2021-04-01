let loginButton = document.getElementById("loginButton");
let cartButton = document.getElementById("cartButton");
let pr = document.getElementById("productRow");
let products;
getProducts();

function loginButtonEvent() {
    
}

function cartButtonEvent() {

}

function getProducts() {
    fetch('productAPI.json')
    .then((response) => response.json())
    .then(function(data) {
        products = data;

        products.forEach(e => {
            populateColumns(e.image, e.price, e.name);

            console.log(e.name);
        });
    })
}


function populateColumns(image, price, name) {
    var divElement = document.createElement("div");
    divElement.className = "col-sm-3";

    divElement.innerHTML = '<div><img class="mw-100 h-100" src="'+image+'"alt=""></div><div><p>'+price+'$</p></div><div><p>'+name+'</p></div><div><button type="button" class="btn btn-secondary btn-block" onclick="addToCart()">Hola</button></div>';

    pr.appendChild(divElement);

}

