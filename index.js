let loginButton = document.getElementById("loginButton");
let cartButton = document.getElementById("cartButton");
let productRow = document.getElementById("productRow");
let products;
getProducts();

function loginButtonEvent() {
    
}

function cartButtonEvent() {

}

function getProducts() {
    fetch('ProduktAPI.json')
    .then((response) => response.json())
    .then(function(data) {
        products = data;

        return products.map(function(product) {
            let name = product.name;
            let image = product.image;
            let price = product.price;

            populateColumns(name, image, price);
        })
    })
}

function populateColumns(name, image, price) {
    productRow.append('<div class="col-sm-3"><div><img class="mw-100 h-100" src="'+image+'"alt=""></div><div><p>'+price+'</p></div><div><p>'+name+'</p></div><div><button type="button" class="btn btn-secondary btn-block">Hola</button></div></div>');


   /*  $prow.append('<div class="col-sm-3"><div class="panel panel-primary"><div class="panel-heading" id="product-title">'+title+'</div><div class="panel-body"><img src='+image+' class="img-responsive" style="width:100%" alt="Image"></div><div class="panel-body"><p id="price">'+price+' $</p><p id="description">'+description+'</p></div><div class="panel-footer"><button type="button" class="btn btn-success btn-block" id='+id+'>Buy</button></div></div></div>');  */
}

