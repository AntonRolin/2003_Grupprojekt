const totalPriceLabel = document.getElementById('totalPrice');
const tbody = document.getElementById('productCartTable');

let productsInCart = [];

updateLocalCart();

function loadProducts(){
    tbody.innerHTML = "";

    productsInCart.forEach(product => {
        let tr = createNode('tr');
        let td1 = createNode('td');
        let td2 = createNode('td');
        let td3 = createNode('td');
        let td4 = createNode('td');
        let td5 = createNode('td');

        td1.innerHTML = product.name;
        td2.innerHTML = `<img src="${product.image}" alt="Produktbild">`;
        td3.innerHTML = `<strong>${product.price}kr</strong>`;
        td4.innerHTML = product.quantity;
        td5.innerHTML = `<button class="btn btn-outline-danger" onclick="removeFromCart()"><strong>–</strong></button>
                         <button class="btn btn-outline-success ms-3" onclick="addToCart(${product})"><strong>+</strong></button>`
                         
        append(tr, td1);
        append(tr, td2);
        append(tr, td3);
        append(tr, td4);
        append(tr, td5);
        append(tbody, tr);
    });
}

function addToCart(product){
    alert("added");
    
}

function removeFromCart(product){
    alert("removed");
}

function emptyCart(){
      alert("empty cart");
  //  localStorage.removeItem('productsInCart');
  //  updateLocalCart();
}

/**
 * Updates whenever a product is added or removed
 */
function updateLocalCart(){

    productsInCart = JSON.parse(localStorage.getItem('productsInCart'));
    loadProducts();
}