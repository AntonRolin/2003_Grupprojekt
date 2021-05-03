const categoryName = document.getElementById('categoryNameCell');

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
function displayProductInfo(category){

    successText.innerHTML = "";
    errorText.innerHTML = "";


    categoryName.innerHTML = category.name;


}
/**
 * When you press change user info button
 */
function changeUserInfo(){ 
    successText.innerHTML = "";
    errorText.innerHTML = "";
    profileButtons.style.display = 'none';

    categoryName.innerHTML = `<input type="text" class="form-control form-control-sm" id="userInfoFirstname" placeholder="${categoryClicked.name}">`;

    saveProfile.innerHTML = `<button type="submit" class="btn btn-outline-success mt-3 float-end" onclick="saveProductInfo()">Spara ändringar</button>`
}



/**
 * When you press the save user info button
 */
function saveProductInfo(){

  let legalExpression = true;
  let categoryName = document.getElementById('userInfoFirstname');



  
  nameRegex(categoryName.value) ? categoryClicked.name = categoryName.value : legalExpression = false;

    successText.innerHTML = "Kategorin har sparats";

    profileButtons.style.display = 'block';
   

     let url2 = 'https://hakimlivsdb.herokuapp.com/category/' + categoryClicked.id + '/catname?value=' + categoryClicked.name;

     axios.patch(url2)
     .then(function (response) {
         console.log(response);
     })
     .catch(function (error) {
         console.log(error);
     });

    
    saveProfile.innerHTML = "";


}


function removeCategory() {

    let url = 'https://hakimlivsdb.herokuapp.com/category/' + categoryClicked.id;

  axios.delete(url)
  .then(function (response) {
      console.log(response);
  })
  .catch(function (error) {
      console.log(error);
  });


  setTimeout(function(){
    alert("Du har raderderat " + categoryClicked.name)
    window.location.href = "admin_profile.html";

}, 500); 


}








function getProductFromApi() {
    fetch("https://hakimlivsdb.herokuapp.com/category/all")
      .then((res) => res.json())
      .then((apiJsonData) => {
        getCategory(apiJsonData);
      });
  }
  
  function getCategory(apiJsonData) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const list = Object.values(apiJsonData);
    const category = list.find((ap) => ap.id == id);
    displayProductInfo(category);
    categoryClicked = category;
  
  }

  