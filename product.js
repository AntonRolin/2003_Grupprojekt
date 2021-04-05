function getProductFromApi() {
  fetch("ProduktAPI.json")
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
}
function displayProduct({name, descp}) {
  let title = document.getElementById("title");
  title.innerHTML = name.toString();
  let description = document.getElementById("description");
  description.innerHTML = descp.toString();
}

getProductFromApi();