const totalPriceLabel = document.getElementById('totalPrice');
const tbody = document.getElementById('productCartTable');

const url = 'ProductAPI.json';
  
let productsInCart = JSON.parse(localStorage.getItem('cartProducts'));
updateLocalCart();
//product.quantity = 1;


function loadProducts(){
    tbody.innerHTML = "";
    console.log(productsInCart.length)
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
        td5.innerHTML = `<button class="btn btn-outline-danger" onclick="removeFromCart(${product.id})"><strong>–</strong></button>
                         <button class="btn btn-outline-success ms-3" onclick="addToCart(${product.id})"><strong>+</strong></button>`;
                         
        append(tr, td1);
        append(tr, td2);
        append(tr, td3);
        append(tr, td4);
        append(tr, td5);
        append(tbody, tr);
    });
    totalPriceLabel.innerHTML = `<strong>Totalt:</strong> ${getTotalPrice()}kr`;
}

function addToCart(id){
    productsInCart.forEach(element => {
        if(element.id == id)
            element.quantity += 1;
    });
    updateLocalCart();
}

function removeFromCart(id){
    productsInCart.forEach(element => {
        if(element.id == id){
            element.quantity -= 1;
                if(element.quantity < 1)
                    productsInCart.splice(productsInCart.indexOf(element), 1);
        }
    });
    updateLocalCart();
}

function emptyCart(){
      productsInCart = [];
      updateLocalCart();
}

/**
 * Updates whenever one or more products are added or removed
 */
function updateLocalCart(){
    localStorage.setItem('cartProducts', JSON.stringify(productsInCart));
    productsInCart = JSON.parse(localStorage.getItem('cartProducts'));
    loadProducts();
}

function getTotalPrice(){
    let sum = 0;
        for(let i = 0; i < productsInCart.length; i++){
            sum += (productsInCart[i].price)*(productsInCart[i].quantity);
        }
    return Math.round(sum);
}


function loadJSON(){
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
       productsInCart = data;
       
})
}