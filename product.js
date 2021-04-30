function getProductFromApi() {
  fetch("https://hakimlivsdb.herokuapp.com/product/all")
    .then((res) => res.json())
    .then((apiJsonData) => {
      getProduct(apiJsonData);
    });
}

function getProduct(apiJsonData) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const list = Object.values(apiJsonData);
  const product = list.find((ap) => ap.id == id);
  displayProduct(product);
  productClicked = product;

}

function displayProduct({name, description, price, category, imageURL}) {
  let titleDisplay = document.getElementById("title");
  titleDisplay.innerHTML = name.toString();
  let descriptionDisplay = document.getElementById("description");
  descriptionDisplay.innerHTML = description.toString();
  let priceDisplay = document.getElementById("price");
  priceDisplay.innerHTML = price.toString() + " kr";
  let imageDisplay = document.getElementById("image");
  imageDisplay.src = imageURL.toString();
}

function buttonAddToCart() {
  var button = document.getElementById("addToCart");
  button.onclick = function (event, x) {
  var items = JSON.parse(localStorage.getItem('cartProducts') || '[]');
  var item = items.find(item => item.name === productClicked.name);

if (item) {
    for (var i = 0; i < items.length; i++){
        if (items[i].name == productClicked.name && items[i].quantity > 0){
            alert('Denna artikel har redan lagts till i kundvagnen')
        }
    }
  } else {
      var localArray = JSON.parse(localStorage.getItem('cartProducts') || '[]');
      productClicked.quantity = 1;
          localArray.push(productClicked);
          localStorage.setItem('cartProducts', JSON.stringify(localArray));
          alert('Du har nu lagt till en produkt i varukorgen');

        }
  }
}


function cartButtonEvent() {
  window.location.href = 'cart.html';
}

var productClicked = "";
buttonAddToCart();
getProductFromApi();
