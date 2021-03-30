const loginBtn = document.getElementById('loginBtn');
const invalidUserMsg = document.getElementById('invalidUserMsg');

/**
 * Attempts to login the user whenever the login button is pressed
 */
function login(){
    invalidUserMsg.innerHTML = "";

    let username = document.getElementById('inputUsername');
    let password = document.getElementById('inputPassword');

    let usernameBool = checkFieldIsEmpty(username);
    let passwordBool = checkFieldIsEmpty(password);

    if(usernameBool){
        if(passwordBool){
            if(checkUserInfo(username, password)){
                invalidUserMsg.innerHTML = "";
                alert("success2");
            }
            else{
                invalidUserMsg.innerHTML = "Kontot finns inte registrerat";
            }
        }
    }
}
/**
 * Checks if the user is in the database
 */
function checkUserInfo(username, password){
    return false;
}

function checkFieldIsEmpty(field){
    if(field.value.length > 0){
        field.style.borderColor = "green";
        document.getElementById(field.getAttribute('aria-describedby')).innerHTML = "";
        return true;
    }
    else{
        field.style.borderColor = "red";
        document.getElementById(field.getAttribute('aria-describedby')).innerHTML = "Field is empty.";
        return false
    }
}
