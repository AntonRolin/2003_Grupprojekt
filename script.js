const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const address = document.getElementById("address");
const zipcode = document.getElementById("zipcode");
const phonenumbers = document.getElementById("phonenumbers");
const password = document.getElementById("password");



// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

//Show success message
function showSuccess(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check if email is valid or not
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "E-post är inte giltig");
  }
}


// Check length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} måste vara minst ${min} tecken`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} måste vara mindre än ${max} tecken`
    );
  } else {
    showSuccess(input);
  }
}


//Check if password match
function checkPasswordsMatch(input1, input2) {

  if (input1.value !== input2.value) {
    showError(input2, "Lösenorden matchar inte");
  }
}

// Get fieldName
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkLength(username, 3, 15);
  checkLength(zipcode, 5, 5);
  checkLength(phonenumbers, 10, 10);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, confirmpassword);
});