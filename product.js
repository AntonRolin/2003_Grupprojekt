function getProductFromApi() {
  fetch("ProductAPI.json")
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
function displayProduct({name, descp, price, category, image}) {
  let titleDisplay = document.getElementById("title");
  titleDisplay.innerHTML = name.toString();
  let descriptionDisplay = document.getElementById("description");
  descriptionDisplay.innerHTML = descp.toString();
  let priceDisplay = document.getElementById("price");
  priceDisplay.innerHTML = price.toString() + " kr";
  let imageDisplay = document.getElementById("image");
  imageDisplay.src = image.toString();
}
function buttonAddToCart() {
  var button = document.getElementById("addToCart");
  button.onclick = function (event, x) {
    var localArray = JSON.parse(localStorage.getItem('cartProducts') || '[]');
        localArray.push(productClicked);
        localStorage.setItem('cartProducts', JSON.stringify(localArray));

}
}
var productClicked = "";
buttonAddToCart();
getProductFromApi();