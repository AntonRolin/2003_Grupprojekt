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
    fetch('ProductAPI.json')
    .then((response) => response.json())
    .then(function(data) {
        products = data;

        products.forEach(e => {
            populateColumns(e.name, e.image, e.price);
            pr.innerHTML = '<div class="col-sm-3"><div><img class="mw-100 h-100" src="'+e.image+'"alt=""></div><div><p>'+e.price+'$</p></div><div><p>'+e.name+'</p></div><div><button type="button" class="btn btn-secondary btn-block">Hola</button></div></div>';
            console.log(e.name);
        });
    })
}


function populateColumns(name, image, price) {
    pr.innerHTML = '<div class="col-sm-3"><div><img class="mw-100 h-100" src="'+image+'"alt=""></div><div><p>'+price+'$</p></div><div><p>'+name+'</p></div><div><button type="button" class="btn btn-secondary btn-block">Hola</button></div></div>';

}

