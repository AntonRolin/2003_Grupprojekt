const firstName = document.getElementById('firstNameCell');
const lastName = document.getElementById('lastNameCell');
const email = document.getElementById('emailCell');
const shipping = document.getElementById('shippingCell');
const city = document.getElementById('cityCell');
const zipcode = document.getElementById('zipcodeCell');

const passwordForm = document.getElementById('passwordForm');
const profileButtons = document.getElementById('profileButtons');
const saveProfile = document.getElementById('saveProfile');
const errorText = document.getElementById('errorText');
const successText = document.getElementById('successText');

let user;
user = JSON.parse(localStorage.getItem('user'));

checkIfLoggedIn();
getUserInfo();

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
    shipping.innerHTML = `${user.shipping}`;
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
    shipping.innerHTML = `<input type="text" class="form-control form-control-sm" id="userInfoShipping" placeholder="${user.shipping}">`;
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
          if(newPassword.value.length == 0)
              errorText.innerHTML = "Ditt nya lösenord måste vara längre än 0 tecken";
          else{
          successText.innerHTML = "Ditt lösenord har ändrats";
          user.password = newPassword.value;
        }
      }
  }
    profileButtons.style.display = 'block';
    passwordForm.innerHTML = "";
    getUserInfo();
}
/**
 * When you press the save user info button
 */
function saveUserInfo(){

    let firstname = document.getElementById('userInfoFirstname');
    let lastname = document.getElementById('userInfoLastname');
    let email = document.getElementById('userInfoEmail');
    let shipping = document.getElementById('userInfoShipping');
    let city = document.getElementById('userInfoCity');
    let zipcode = document.getElementById('userInfoZipcode');

    if(firstname.value != "")
      user.firstname = firstname.value;
    if(lastname.value != "")
      user.lastname = lastname.value;
    if(email.value != "")
      user.email = email.value;
    if(shipping.value != "")
      user.shipping = shipping.value;
    if(city.value != "")
      user.city = city.value;
    if(zipcode.value != "")
      user.zipcode = zipcode.value;

    successText.innerHTML = "Dina uppgifter har sparats";

    profileButtons.style.display = 'block';
    getUserInfo();
    saveProfile.innerHTML = "";
}