const firstName = document.getElementById('firstNameCell');
const lastName = document.getElementById('lastNameCell');
const email = document.getElementById('emailCell');
const shipping = document.getElementById('shippingCell');
const city = document.getElementById('cityCell');
const zipcode = document.getElementById('zipcodeCell');

const passwordForm = document.getElementById('passwordForm');
const ordersForm = document.getElementById('ordersForm');
const profileButtons = document.getElementById('profileButtons');
const saveProfile = document.getElementById('saveProfile');
const errorText = document.getElementById('errorText');
const successText = document.getElementById('successText');

let or = document.getElementById("orderRow");
let pr = document.getElementById("productRow");
let cu = document.getElementById("customerRow");
let ca = document.getElementById("categoryRow");
let products = [];
let customer = [];
let orders = [];

let user;
user = JSON.parse(localStorage.getItem('user'));

checkIfLoggedIn();
getUserInfo();
getOrders();
getCustomers();
getProducts();
getCategory();


/**
 * Checks if user is logged in, if not the site redirects to index
 */
function checkIfLoggedIn(){
    if(localStorage.getItem('user') == undefined)
        window.location.href = 'index.html';
}
/**
 * Updates table with the logged in users info from localStorage
 */
function getUserInfo(){

    firstName.innerHTML = `${user.firstname}`;
    lastName.innerHTML = `${user.lastname}`;
    email.innerHTML = `${user.email}`;
    shipping.innerHTML = `${user.address}`;
    city.innerHTML = `${user.city}`;
    zipcode.innerHTML = `${user.zipcode}`;
}
/**
 * When you press change user info button
 */
function changeUserInfo(){ 
    successText.innerHTML = "";
    errorText.innerHTML = "";
    profileButtons.style.display = 'none';

    firstName.innerHTML = `<input type="text" class="form-control form-control-sm" id="userInfoFirstname" placeholder="${user.firstname}">`;
    lastName.innerHTML = `<input type="text" class="form-control form-control-sm" id="userInfoLastname" placeholder="${user.lastname}">`;
    email.innerHTML = `<input type="text" class="form-control form-control-sm" id="userInfoEmail" placeholder="${user.email}">`;
    shipping.innerHTML = `<input type="text" class="form-control form-control-sm" id="userInfoShipping" placeholder="${user.address}">`;
    city.innerHTML = `<input type="text" class="form-control form-control-sm" id="userInfoCity" placeholder="${user.city}">`;
    zipcode.innerHTML = `<input type="text" class="form-control form-control-sm" id="userInfoZipcode" placeholder="${user.zipcode}">`;

    saveProfile.innerHTML = `<button type="submit" class="btn btn-outline-success mt-3 float-end" onclick="saveUserInfo()">Spara ändringar</button>`
}
/**
 * When you press log out button
 */
function logOut(){
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

/**
 * When you press change password button
 */
function changePassword(){
    successText.innerHTML = "";
    errorText.innerHTML = "";
    profileButtons.style.display = 'none';

    passwordForm.innerHTML = `<form>
    <div class="mb-3">
      <label for="currentPassword" class="form-label">Nuvarande lösenord</label>
      <input type="password" class="form-control" id="currentPassword" aria-describedby="currentPasswordHelp">
    </div>
    <div class="mb-3">
      <label for="newPassword" class="form-label">Nytt lösenord</label>
      <input type="password" class="form-control" id="newPassword">
    </div>
    <div class="mb-3">
        <label for="newPassword2" class="form-label">Bekräfta nytt lösenord</label>
        <input type="password" class="form-control" id="newPassword2">
      </div>
    <button type="button" class="btn btn-outline-success float-end" onclick="savePassword()">Spara ändringar</button>
  </form>`;
}

/**
 * When you press the save password change button
 */
function savePassword(){

    let currentPassword = document.getElementById('currentPassword');
    let newPassword = document.getElementById('newPassword');
    let newPassword2 = document.getElementById('newPassword2');

    if(currentPassword.value != user.password)
        errorText.innerHTML = "Ditt nuvarande lösenord stämmer inte. Försök igen";
    else{
        if(newPassword.value != newPassword2.value){
            errorText.innerHTML = "Ditt nya lösenord stämmer inte överrens. Försök igen";
        }
        else{
          if(!passwordRegex(newPassword.value))
              errorText.innerHTML = "Ditt nya lösenord måste vara minst 8 tecken, minst en bokstav, minst en siffra";
          else{
          successText.innerHTML = "Ditt lösenord har ändrats";
          user.password = newPassword.value;
        }
      }
  }
    profileButtons.style.display = 'block';
    passwordForm.innerHTML = "";

    // Saves user password in localStorage
    localStorage.setItem('user', JSON.stringify(user));

    let url = 'https:/http://localhost:8080/customer/update/' + user.id + '/' + user.password;

    axios.patch(url)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

    getUserInfo();
}
/**
 * When you press the save user info button
 */
function saveUserInfo(){

    let legalExpression = true;
    let firstname = document.getElementById('userInfoFirstname');
    let lastname = document.getElementById('userInfoLastname');
    let email = document.getElementById('userInfoEmail');
    let shipping = document.getElementById('userInfoShipping');
    let city = document.getElementById('userInfoCity');
    let zipcode = document.getElementById('userInfoZipcode');

    nameRegex(firstname.value) ? user.firstname = firstname.value : legalExpression = false;

    nameRegex(lastname.value) ? user.lastname = lastname.value : legalExpression = false;

    emailRegex(email.value) ? user.email = email.value : legalExpression = false;

    addressRegex(shipping.value) ? user.address = shipping.value :  legalExpression = false;

    cityRegex(city.value) ? user.city = city.value : legalExpression = false;

    zipCodeRegex(zipcode.value) ? user.zipcode = zipcode.value : legalExpression = false;

    successText.innerHTML = "Dina uppgifter har sparats";

    profileButtons.style.display = 'block';

     // Saves user data in localStorage
     localStorage.setItem('user', JSON.stringify(user));


     let url = 'https://hakimlivsdb.herokuapp.com/customer/update/' + user.id + '/' + user.firstname + '/' + user.lastname + '/' + user.email + '/' + user.address + '/' + user.zipcode + '/' + user.city;

        axios.patch(url)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    getUserInfo();
    saveProfile.innerHTML = "";


}




function getOrders() {
    let url5 = 'https://hakimlivsdb.herokuapp.com/orders/all'
    fetch(url5)
    .then((response) => response.json())
    .then(function(data) {
        orders = data;
        orders.forEach(e => {
            populateOrdersColumns(e);
        });
    })
}

function getCategory() {
    let url5 = 'https://hakimlivsdb.herokuapp.com/category/all'
    fetch(url5)
    .then((response) => response.json())
    .then(function(data) {
        orders = data;
        orders.forEach(e => {
            populateCategoryColumns(e);
        });
    })
}

function addProduct(){
    window.location.href = "adminaddproduct.html";

}

function addCategory(){
    window.location.href = "adminaddcategory.html";

}


function populateOrdersColumns(item) {
    let divElement = document.createElement("div");
    divElement.className = "col-md-4 pb-5";
    divElement.innerHTML = `<div class="my-3 ms-2 text-center"><p class="lead text-danger fs-2 fw-bold"><button type="button" id="${item.id}" class="buyButton btn btn-outline-success btn-lg" onclick="sendOrderDetails(${item.id})">${item.id}</button></p><hr></div>`;
    or.appendChild(divElement);
}

function populateCategoryColumns(item) {
    let divElement = document.createElement("div");
    divElement.className = "col-md-4 pb-5";
    divElement.innerHTML = `<div class="my-3 ms-2 text-center"><p class="lead text-danger fs-2 fw-bold"><button type="button" id="${item.id}" class="buyButton btn btn-outline-success btn-lg" onclick="sendCategoryDetails(${item.id})">${item.name}</button></p><hr></div>`;
    ca.appendChild(divElement);
}

function sendOrderDetails(id) {

    localStorage.setItem('orderID', JSON.stringify(id));
    window.location.href = "orderdetails.html";

}

function sendCategoryDetails(id){

    localStorage.setItem('categoryID', JSON.stringify(id));
    window.location.href = "admincategory.html?id="+id;
}

function sendCustomerDetails(id) {

    localStorage.setItem('customerID', JSON.stringify(id));
    window.location.href = "admincustomer.html";

}

function sendProductDetails(id) {

    window.location.href = "adminprodukt.html?id="+id;

}


function getCustomers() {
    let url5 = 'https://hakimlivsdb.herokuapp.com/customer/all'
    fetch(url5)
    .then((response) => response.json())
    .then(function(data) {
        customer = data;
        customer.forEach(e => {
            populateCustomerColumns(e);
        });
    })
}

function populateCustomerColumns(item) {
    let divElement = document.createElement("div");
    divElement.className = "col-md-4 pb-5";
    divElement.innerHTML = `<div class="my-3 ms-2 text-center"><p class="lead text-danger fs-2 fw-bold"><button type="button" id="${item.id}" class="buyButton btn btn-outline-success btn-lg" onclick="sendCustomerDetails(${item.id})">${item.id} ${item.firstname} ${item.lastname} </button></p><hr></div>`;
    cu.appendChild(divElement);
}


function getProducts() {
    let url5 = 'https://hakimlivsdb.herokuapp.com/product/all'
    fetch(url5)
    .then((response) => response.json())
    .then(function(data) {
        product = data;
        product.forEach(e => {
            populateProductColumns(e);
        });
    })
}


function populateProductColumns(item) {
    let divElement = document.createElement("div");
    divElement.className = "col-md-4 pb-5";
    divElement.innerHTML = `<div class="my-3 ms-2 text-center"><p class="lead text-danger fs-2 fw-bold"><button type="button" id="${item.id}" class="buyButton btn btn-outline-success btn-lg" onclick="sendProductDetails(${item.id})">${item.id} ${item.name}</button></p><hr></div>`;
    pr.appendChild(divElement);
}





