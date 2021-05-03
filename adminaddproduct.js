const productName = document.getElementById('productNameCell');
const price = document.getElementById('priceCell');
const description = document.getElementById('descriptionCell');
const imageURL = document.getElementById('imageURLCell');
const quantity = document.getElementById('quantityCell');
const category = document.getElementById('categoryCell');

const ordersForm = document.getElementById('ordersForm');
const profileButtons = document.getElementById('profileButtons');
const saveProfile = document.getElementById('saveProfile');
const errorText = document.getElementById('errorText');
const successText = document.getElementById('successText');

let customer = [];
let orders = [];
let productClicked;

let addProductname;
let addProductPrice;
let addProductDescription;
let addProductImageURL;
let addProductQuantity;
let addProductCategory;




checkIfLoggedIn();
changeUserInfo();





/**
 * Checks if user is logged in, if not the site redirects to index
 */
function checkIfLoggedIn(){
    if(localStorage.getItem('user') == undefined)
        window.location.href = 'index.html';
}

/**
 * When you press change user info button
 */
function changeUserInfo(){ 
    successText.innerHTML = "";
    errorText.innerHTML = "";
    profileButtons.style.display = 'none';

    productName.innerHTML = `<input type="text" class="form-control form-control-sm" id="productInfoName" placeholder="Produkt namn">`;
    price.innerHTML = `<input type="text" class="form-control form-control-sm" id="productInfoPrice" placeholder="Produkt pris">`;
    description.innerHTML = `<input type="text" class="form-control form-control-sm" id="productInfoDescription" placeholder="Produkt beskrivning">`;
    imageURL.innerHTML = `<input type="text" class="form-control form-control-sm" id="productInfoImageURL" placeholder="Produkt bildlänk">`;
    quantity.innerHTML = `<input type="text" class="form-control form-control-sm" id="productInfoQuantity" placeholder="Produkt kvantitet">`;
    category.innerHTML = `<input type="text" class="form-control form-control-sm" id="productInfoCategory" placeholder="Produkt kategori">`;

    saveProfile.innerHTML = `<button type="submit" class="btn btn-outline-success mt-3 float-end" onclick="saveProductInfo()">Spara ändringar</button>`
}



/**
 * When you press the save user info button
 */
function saveProductInfo(){

  let legalExpression = true;
  let productName = document.getElementById('productInfoName');
  let price = document.getElementById('productInfoPrice');
  let description = document.getElementById('productInfoDescription');
  let imageURL = document.getElementById('productInfoImageURL');
  let quantity = document.getElementById('productInfoQuantity');
  let category = document.getElementById('productInfoCategory');

 
  
  addProductname = productName.value;
  addProductPrice = price.value;
  addProductDescription = description.value;
  addProductImageURL = imageURL.value;
  addProductQuantity = quantity.value;
  addProductCategory = category.value;

    successText.innerHTML = "Dina uppgifter har sparats";

    profileButtons.style.display = 'block';
       
    saveProfile.innerHTML = "";

    getCategoryId(addProductCategory);


}

function getCategoryId(categoryname){
    fetch('https://hakimlivsdb.herokuapp.com/category/all')
    .then((response) => response.json())
    .then(function(data) {
        data.forEach(e => {
            if (e.name == categoryname)
            saveNewProduct(e.id)
        });

    })

}


function saveNewProduct(categoryid){
    let url = 'https://hakimlivsdb.herokuapp.com/product/addWCategory?name=' + addProductname + '&price=' + addProductPrice + '&description=' + addProductDescription + '&imageURL=' + addProductImageURL + '&quantity=' + addProductQuantity + '&categoryId=' + categoryid

    axios.post(url)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

}


