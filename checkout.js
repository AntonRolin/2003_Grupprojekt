let productsInCart = JSON.parse(localStorage.getItem('cartProducts'));
let user;

const tbody = document.getElementById('checkoutTable');
const totPriceLabel = document.getElementById('totalPrice');
const nameLabel = document.getElementById('accountName');
const addressField = document.getElementById('inputAddress');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const userNotLoggedInMessage = document.getElementById('userNotLoggedInMessage');

//getLocalStorage();
loadProducts();

getUser();
loadUserInfo();


function loadProducts(){

    productsInCart.forEach(product => {
          let tr =  createNode('tr');
          let td1 =  createNode('td');
          let td2 =  createNode('td');
          let td3 =  createNode('td');
          let td4 =  createNode('td');

          //innerHTML
            td1.innerHTML = product.name;
            td1.setAttribute("class", "d-flex justify-content-center pt-5");
            td2.innerHTML = `<img src="${product.image}" alt="Produktbild" ">`;
            td2.setAttribute("class", "justify-content-center");
            td3.innerHTML = `<strong>${product.price}kr</strong>`;
            td3.setAttribute("class", "justify-content-center pt-5");
            td4.innerHTML = product.quantity;
            td4.setAttribute("class", "justify-content-center pt-5");

          append(tr, td1);
          append(tr, td2);
          append(tr, td3);
          append(tr, td4);
          append(tbody, tr);
    });
    totPriceLabel.innerHTML = `Totalt: ${getTotalPrice()}kr`;
}

function loadUserInfo(){
    if(user.firstname != undefined){
        nameLabel.innerHTML = `<strong>${user.firstname} ${user.lastname}</strong>`;
        addressField.value = user.shipping;
    }
    else{
        console.log('not logged in');
    }
}

function getTotalPrice(){
    let sum = 0;
        for(let i = 0; i < productsInCart.length; i++){
            sum += (productsInCart[i].price)*(productsInCart[i].quantity);
        }
    return Math.round(sum);
}

function order(){
    let addressHasValue = checkInputEmptyField(addressField);
    let emptyCart = false;
    let userLoggedIn = true;
    if(productsInCart.length == 0){
        emptyCartMessage.innerHTML = 'Du kan inte beställa utan produkter';
        emptyCart = true;
    }
    if(user.firstname == undefined){
        userNotLoggedInMessage.innerHTML = 'Du måste vara inloggad för att beställa';
        console.log('user = null')
        userLoggedIn = false;
    }

    if(addressHasValue && userLoggedIn && !emptyCart){
        localStorage.setItem('cartProducts', JSON.stringify([]));
        window.location.href = 'success.html';
    }
}

function checkInputEmptyField(field){
    if(field.value.length > 0){
        field.style.borderColor = "green";
        document.getElementById(field.getAttribute('aria-describedby')).innerHTML = "";
        return true;
    }
    else{
        field.style.borderColor = "red";
        document.getElementById(field.getAttribute('aria-describedby')).innerHTML = "Fältet är tomt";
        return false;
    }
}

function getUser(){
    //TESTKOD
    //let testUser = { firstName: "Hakim", lastName: "Livs", address: "Nackademin 100"}
    //localStorage.setItem('user', JSON.stringify(testUser));

    user = JSON.parse(localStorage.getItem('user'));
} 