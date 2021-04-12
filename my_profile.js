const firstName = document.getElementById('firstNameCell');
const lastName = document.getElementById('lastNameCell');
const email = document.getElementById('emailCell');
const shipping = document.getElementById('shippingCell');
const city = document.getElementById('cityCell');
const zipcode = document.getElementById('zipcodeCell');

const passwordForm = document.getElementById('passwordForm');
const profileButtons = document.getElementById('profileButtons');
const saveProfile = document.getElementById('saveProfile');

let user;

checkIfLoggedIn();
getUserInfo();

function checkIfLoggedIn(){
    if(localStorage.getItem('user') == undefined)
        window.location.href = 'index.html';
}

function getUserInfo(){
    user = JSON.parse(localStorage.getItem('user'));

    firstName.innerHTML = `${user.firstname}`;
    lastName.innerHTML = `${user.lastname}`;
    email.innerHTML = `${user.email}`;
    shipping.innerHTML = `${user.shipping}`;
    city.innerHTML = `${user.city}`;
    zipcode.innerHTML = `${user.zipcode}`;
}

function changeUserInfo(){ 
    profileButtons.style.display = 'none';

    firstName.innerHTML = `<input type="text" class="form-control form-control-sm" placeholder="${user.firstname}">`;
    lastName.innerHTML = `<input type="text" class="form-control form-control-sm" placeholder="${user.lastname}">`;
    email.innerHTML = `<input type="text" class="form-control form-control-sm" placeholder="${user.email}">`;
    shipping.innerHTML = `<input type="text" class="form-control form-control-sm" placeholder="${user.shipping}">`;
    city.innerHTML = `<input type="text" class="form-control form-control-sm" placeholder="${user.city}">`;
    zipcode.innerHTML = `<input type="text" class="form-control form-control-sm" placeholder="${user.zipcode}">`;

    saveProfile.innerHTML = `<button type="submit" class="btn btn-outline-success mt-3 float-end" onclick="saveUserInfo()">Spara ändringar</button>`
}

function logOut(){
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

function changePassword(){
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
    <button type="submit" class="btn btn-outline-success float-end" onclick="savePassword()">Spara ändringar</button>
  </form>`;
}

function savePassword(){
    let currentPassword = document.getElementById('currentPassword');
    let newPassword = document.getElementById('newPassword');
    let newPassword2 = document.getElementById('newPassword2');

    if(newPassword.value == newPassword2.value){
        console.log("samma");
    }
}

function saveUserInfo(){
    profileButtons.style.display = 'block';
    getUserInfo();
    saveProfile.innerHTML = "";
}