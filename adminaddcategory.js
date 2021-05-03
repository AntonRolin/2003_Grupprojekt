const categoryName = document.getElementById('categoryNameCell');

const ordersForm = document.getElementById('ordersForm');
const profileButtons = document.getElementById('profileButtons');
const saveProfile = document.getElementById('saveProfile');
const errorText = document.getElementById('errorText');
const successText = document.getElementById('successText');

let customer = [];
let orders = [];
let productClicked;

let addCategoryname;





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

    categoryName.innerHTML = `<input type="text" class="form-control form-control-sm" id="productInfoName" placeholder="Kategorinamn">`;

    saveProfile.innerHTML = `<button type="submit" class="btn btn-outline-success mt-3 float-end" onclick="saveCategoryInfo()">Spara ändringar</button>`
}



/**
 * When you press the save user info button
 */
function saveCategoryInfo(){


  let categoryName = document.getElementById('productInfoName');

 
  
  addCategoryname = categoryName.value;

    successText.innerHTML = "Dina uppgifter har sparats";

    profileButtons.style.display = 'block';
       
    saveProfile.innerHTML = "";


    let url = 'https://hakimlivsdb.herokuapp.com/category/add?name=' + addCategoryname

    axios.post(url)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });



}



