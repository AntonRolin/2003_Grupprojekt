function getProductFromApi() {
  fetch("/ProduktAPI.json")
    .then((res) => res.json())
    .then((apiJsonData) => {
      createProduct(apiJsonData);
    });
    
}
// database is object array of all the products
    function createProduct(database) {
            let productDiv = document.getElementById("product");
          
            for (let i = 0; i < database.length; i++) {
              var productCategory = document.createElement("div");
              productCategory.innerHTML = database[i].category;
          
              var productTitle = document.createElement("div");
              productTitle.innerHTML = database[i].title;
          
              var productDescription = document.createElement("div");
              productDescription.innerHTML = database[i].descp;
          
              var productImage = document.createElement("img");
              productImage.src = database[i].image;
          
              var productPrice = document.createElement("div");
              productPrice.innerHTML = database[i].price;

              var productName = document.createElement("div");
              productPrice.innerHTML = database[i].name;
          
              product.appendChild(productCategory);
              product.appendChild(productTitle);
              product.appendChild(productDescription);
              product.appendChild(productImage);
              product.appendChild(productPrice);
              product.appendChild(productName);

              var button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.id = database[i].id;
    button.onclick = function (event, x) {
      const pros = JSON.parse(localStorage.getItem("product"));
      pros.push({ id: database[i].id, title: database[i].title, price: database[i].price });

      localStorage.setItem("product", JSON.stringify(pros));
    };
    button.innerHTML = "Add to cart";
    product.appendChild(button);
  }
}
getProductFromApi();
const pros = JSON.parse(localStorage.getItem("product"));
if (!pros) localStorage.setItem("product", JSON.stringify([]));
