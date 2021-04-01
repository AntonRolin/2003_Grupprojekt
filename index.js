let loginButton = document.getElementById("loginButton");
let cartButton = document.getElementById("cartButton");

getProducts();

function loginButtonEvent() {
    
}

function cartButtonEvent() {

}

function getProducts() {
    fetch('ProduktAPI.json')
    .then((response) => response.json())
    .then(data => {
        console.log(data.name);
    })
}

