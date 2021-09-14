const loginBtn = document.getElementById('loginBtn');
const responseMsg = document.getElementById('responseMessage');
const url = 'https://hakimlivsdb.herokuapp.com/customer/all';
const url1 = 'https://hadb2v2.herokuapp.com//login';
let customers;
let loggedInUser;



loadData();
/**
 * Attempts to login the user whenever the login button is pressed
 */
function login(){
    responseMsg.innerHTML = "";

    let username = document.getElementById('inputUsername');
    let password = document.getElementById('inputPassword');

    let usernameBool = checkFieldIsEmpty(username);
    let passwordBool = checkFieldIsEmpty(password);

    basiclogin(username.value, password.value);
}
/**
 * Checks if the user is in the database
 */


 async function basiclogin (username, password) {
    response = await zlFetch.post(url1, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: {            
        username: username,
        password: password}
      })
      
      const { token } = response.body
  
      localStorage.setItem('token', token)
  
      
  }

function checkFieldIsEmpty(field){
    if(field.value.length > 0){
        field.style.borderColor = "green";
        document.getElementById(field.getAttribute('aria-describedby')).innerHTML = "";
        return true;
    }
    else{
        field.style.borderColor = "red";
        document.getElementById(field.getAttribute('aria-describedby')).innerHTML = "Fältet är tomt";
        return false
    }
}

function loadData(){
    fetch(url)
    .then(resp => resp.json())
    .then(function(data) {
       customers = data;
       return customers;
    });
}
