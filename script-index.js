let endpoint = "./produktAPI.json";
const outputEl = document.getElementById("output");

document.addEventListener("DOMContentLoaded", function () {
  load(endpoint, renderProducts);
});

/**
 * General Ajax Load Function
 * @param {*} endpoint resource in JSON format
 * @param {*} render callback when response is ready
 */
function load(endpoint, render) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", endpoint);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      render(data);
    }
  };
}

/**
 * Render all products in an HTML table
 * @param {*} products
 */
function renderProducts(products) {
  let output = `
  <table class="table">
  <thead>
    <tr>
      <th scope="col">Titel</th>
      <th scope="col">Beskrivning</th>
      <th scope="col">Pris</th>
      <th scope="col">Bild</th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
    </thead>`;
  products.forEach((product) => {
    output += `
    <div class="shop-item">
    <tr>
    <td><span class="shop-item-title">${product.name}</span></td>
    <td><span style="
    width: 200px;
    display: block;

    ;">${product.descp}</span></td>
    <div class="shop-item-details">
    <td style="text-align:left"><span class="shop-item-price">${product.price.toFixed(2)}</span></td>
    <td><img width="200" height="200" src="${product.image}" class="shop-item-image"></td>
    <td><button type="button" onclick="cart1('${product.name}','${product.price.toFixed(2)}','${product.image}', '1' ), location.href='./cart.html'" class="btn btn-primary shop-item-button">Köp</button></td>
    <td><button type="button" onclick="cart1('${product.name}','${product.price.toFixed(2)}','${product.image}', '1')" class="btn btn-primary shop-item-button">Lägg till</button></td>
</div>
    </tr>
    
    </div>
    `;
  });
  output += `</table>`;
  outputEl.innerHTML = output;
}

/**
 * Retrieves the products from localStorage
 * Adds products to localStorage
 * Updates quantity in localStorage *
 * Checks if product title exists and amount of quantity
 */

function cart1(title, price, image, quantity){
  var items = JSON.parse(localStorage.getItem('cart')) || [];
  var item = items.find(item => item.title === title);

  if (item) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].title == title && items[i].quantity == 0) {        
          item.quantity = quantity;
          
      }
      else if (items[i].title == title && items[i].quantity > 0) {
        
        alert('Denna artikel har redan lagts till i kundvagnen')
    }
  }
    
  } else {
    alert('Du har nu lagt till en produkt i varukorgen')
    items.push({
      title,
      price,
      image,
      quantity
    })
  }
  
  localStorage.setItem('cart', JSON.stringify(items));
  console.log(items);
}