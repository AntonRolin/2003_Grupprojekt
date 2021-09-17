let productsInCart = JSON.parse(localStorage.getItem('cartProducts'));
let userInCart = JSON.parse(localStorage.getItem('user'));
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
            td2.innerHTML = `<img src="${product.imageURL}" alt="Produktbild" ">`;
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
        addressField.value = user.address;
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
        addNewOrdertoDB();
        getOrderIdData();

        setTimeout(function(){
            window.location.href = 'success.html';

        }, 4500); 
        
    }
}


function getOrderIdData(){

    let url5 = 'https://hakimlivsdb.herokuapp.com/orders/get/OrderID/' + user.id
    
    setTimeout(() => {
        axios.get(url5)
        .then(response => {
            this.data = response.data;
            this.data.forEach((item) => {
              console.log("found: ", item)
              console.log("found id: ", item.id)
              this.addCartProductToDB(item.id);
              
            })
          });
     }, 100)
}

function addNewOrdertoDB(){

        let url2 = 'https://hakimlivsdb.herokuapp.com/orders/add/' + user.address + '/' + user.id  + '/' + getTotalPrice();

        axios.get(url2)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function addCartProductToDB(order12){
    
        var config = {
        method: 'post',
        url: 'https://localhost:8080/payment',
        headers: { 
          'amount': getTotalPrice(), 
          'reference': order12,
          'Content-Type': 'application/json', 
          'accept': 'application/json'
        }
      };

    axios(config)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    });
    
    productsInCart.forEach(product => {
        let url2 = 'https://hakimlivsdb.herokuapp.com/order/row/add/' + order12 + '/' + product.id + '/' + product.quantity;

        axios.get(url2)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    
    });
            localStorage.setItem('cartProducts', JSON.stringify([]));
            

            
}

function checkInputEmptyField(field){
    if(addressRegex(field.value)){
        field.style.borderColor = "green";
        document.getElementById(field.getAttribute('aria-describedby')).innerHTML = "";
        return true;
    }
    else{
        field.style.borderColor = "red";
        document.getElementById(field.getAttribute('aria-describedby')).innerHTML = "Ogiltigt format på adress";
        return false;
    }
}

function getUser(){
    //TESTKOD
    //let testUser = { firstName: "Hakim", lastName: "Livs", address: "Nackademin 100"}
    //localStorage.setItem('user', JSON.stringify(testUser));

    user = JSON.parse(localStorage.getItem('user'));
} 
