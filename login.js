const loginBtn = document.getElementById('loginBtn');
const responseMsg = document.getElementById('responseMessage');
const url = 'http://localhost:8080/customer/all';
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

    if(usernameBool){
        if(passwordBool){
            if(checkUserInfo(username.value, password.value)){
                localStorage.setItem('user', JSON.stringify(loggedInUser));
                responseMsg.className = "text-center text-success";
                responseMsg.innerHTML = `Du är nu inloggad som ${loggedInUser.firstname} ${loggedInUser.lastname}`;
            }
            else{
                responseMsg.className = "text-center text-danger";
                responseMsg.innerHTML = "Något blev fel, försök igen";
            }
        }
    }
}
/**
 * Checks if the user is in the database
 */
function checkUserInfo(username, password){
    let isInDatabase = false;
    customers.forEach(customer => {
        if(customer.email == username && customer.password == password){
            isInDatabase = true;
            loggedInUser = customer;
        }
    });
    return isInDatabase;
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
