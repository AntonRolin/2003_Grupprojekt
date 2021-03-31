let productsInCart = JSON.parse(localStorage.getItem('productsInCart'));
const tbody = document.getElementById('checkoutTable');
const totPriceLabel = document.getElementById('totalPrice');
const nameLabel = document.getElementById('accountName');
const addressField = document.getElementById('inputAddress');

function loadProducts(){

    productsInCart.forEach(product => {
          let tr =  createNode('tr');
          let td1 =  createNode('td');
          let td2 =  createNode('td');
          let td3 =  createNode('td');
          let td4 =  createNode('td');

          //innerHTML
            td1.innerHTML = product.name;
            td2.innerHTML = `<img src="${product.image}" alt="Produktbild" ">`;
            td3.innerHTML = `<strong>${product.price}kr</strong>`;
            td4.innerHTML = product.quantity;

          append(tr, td1);
          append(tr, td2);
          append(tr, td3);
          append(tr, td4);
          append(tbody, tr);
    });
    totPriceLabel.innerHTML = `Totalt: ${getTotalPrice()}kr`;
}

function insertAddress(){

}

function getTotalPrice(){
    let sum = 0;
        for(let i = 0; i < productsInCart.length; i++){
            sum += productsInCart[i].price;
        }
    return Math.round(sum);
}