const productName = document.getElementById('productNameCell');
const price = document.getElementById('priceCell');
const description = document.getElementById('descriptionCell');
const imageURL = document.getElementById('imageURLCell');
const quantity = document.getElementById('quantityCell');

const ordersForm = document.getElementById('ordersForm');
const profileButtons = document.getElementById('profileButtons');
const saveProfile = document.getElementById('saveProfile');
const errorText = document.getElementById('errorText');
const successText = document.getElementById('successText');

let customer = [];
let orders = [];
let products;




checkIfLoggedIn();
getProductFromApi();





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
function displayProductInfo(product){

    successText.innerHTML = "";
    errorText.innerHTML = "";


    productName.innerHTML = product.name;
    price.innerHTML = product.price;
    description.innerHTML = product.description;
    imageURL.innerHTML = product.imageURL;
    quantity.innerHTML = product.quantity;


}
/**
 * When you press change user info button
 */
function changeUserInfo(){ 
    successText.innerHTML = "";
    errorText.innerHTML = "";
    profileButtons.style.display = 'none';

    productName.innerHTML = `<input type="text" class="form-control form-control-sm" id="userInfoFirstname" placeholder="${productClicked.name}">`;
    price.innerHTML = `<input type="text" class="form-control form-control-sm" id="userInfoLastname" placeholder="${productClicked.price}">`;
    description.innerHTML = `<input type="text" class="form-control form-control-sm" id="userInfoEmail" placeholder="${productClicked.description}">`;
    imageURL.innerHTML = `<input type="text" class="form-control form-control-sm" id="userInfoShipping" placeholder="${productClicked.imageURL}">`;
    quantity.innerHTML = `<input type="text" class="form-control form-control-sm" id="userInfoCity" placeholder="${productClicked.quantity}">`;

    saveProfile.innerHTML = `<button type="submit" class="btn btn-outline-success mt-3 float-end" onclick="saveProductInfo()">Spara ändringar</button>`
}



/**
 * When you press the save user info button
 */
function saveProductInfo(){

  let legalExpression = true;
  let productName = document.getElementById('userInfoFirstname');
  let price = document.getElementById('userInfoLastname');
  let description = document.getElementById('userInfoEmail');
  let imageURL = document.getElementById('userInfoShipping');
  let quantity = document.getElementById('userInfoCity');


  
  nameRegex(productName.value) ? productClicked.productName = productName.value : legalExpression = false;
  onlyNumbersRegex(price.value) ? productClicked.price = price.value : legalExpression = false;
  nameRegex(description.value) ? productClicked.description = description.value : legalExpression = false;
  onlyimageUrlRegex(imageURL.value) ? productClicked.imageURL = imageURL.value : legalExpression = false;
  onlyNumbersRegex(quantity.value) ? productClicked.quantity = quantity.value : legalExpression = false;

    successText.innerHTML = "Dina uppgifter har sparats";

    profileButtons.style.display = 'block';
   

     let url = 'https://hakimlivsdb.herokuapp.com/product/update/' + productClicked.id + '/' + productClicked.name + '/' + productClicked.price + '/' + productClicked.description + '/' + productClicked.quantity;
     let url2 = 'https://hakimlivsdb.herokuapp.com/product/9/imageURL?value=' + productClicked.imageURL;

     axios.patch(url)
     .then(function (response) {
         console.log(response);
     })
     .catch(function (error) {
         console.log(error);
     });


     axios.patch(url2)
     .then(function (response) {
         console.log(response);
     })
     .catch(function (error) {
         console.log(error);
     });

    
    saveProfile.innerHTML = "";


}


function removeProduct() {

    let url = 'https://hakimlivsdb.herokuapp.com/product/' + productClicked.id;

  axios.delete(url)
  .then(function (response) {
      console.log(response);
  })
  .catch(function (error) {
      console.log(error);
  });


  setTimeout(function(){
    alert("Du har raderderat " + productClicked.name)
    window.location.href = "admin_profile.html";

}, 500); 


}








function getProductFromApi() {
    fetch("https://hakimlivsdb.herokuapp.com/product/all")
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
    displayProductInfo(product);
    productClicked = product;
  
  }

  