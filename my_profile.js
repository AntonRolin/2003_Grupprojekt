const firstName = document.getElementById('firstNameCell');
const lastName = document.getElementById('lastNameCell');
const email = document.getElementById('emailCell');
const shipping = document.getElementById('shippingCell');
const city = document.getElementById('cityCell');
const zipcode = document.getElementById('zipcodeCell');

const passwordForm = document.getElementById('passwordForm');

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

}

function logOut(){
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

function changePassword(){
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

    
}