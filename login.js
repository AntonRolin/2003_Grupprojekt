const loginBtn = document.getElementById('loginBtn');

loginBtn.onclick = login();

/**
 * Attempts to login the user whenever the login button is pressed
 */
function login(){
    let username = document.getElementById('inputUsername');
    let password = document.getElementById('inputPassword');

    checkFieldIsEmpty(username);
    checkFieldIsEmpty(password);

    if(username){
        if(password){
            if(checkUserInfo(username, password)){

            }
        }
    }
}
/**
 * Checks if the user is in the database
 */
function checkUserInfo(username, password){
    return true;
}

function checkFieldIsEmpty(field){
    if(field.length > 0){
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

