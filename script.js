const form = document.getElementById('form');
const username1 = document.getElementById('username1');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const address = document.getElementById('address');
const zipcode = document.getElementById('zipcode');
const phonenr = document.getElementById('phonenr');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

/**
 * Trims to remove the whitespaces
 * Validating order form
 * Checks if everything is validated and gives a alert
 */

function checkInputs() {
	
  const username1Value = username1.value.trim();
	const firstnameValue = firstname.value.trim();
  const lastnameValue = lastname.value.trim();
	const emailValue = email.value.trim();
  const addressValue = address.value.trim();
  const zipcodeValue = zipcode.value.trim();
  const phonenrValue = phonenr.value.trim();
  const password1Value = password1.value.trim();
  const password2Value = password2.value.trim();

    var username1True;
    var firstnameTrue;
    var lastnameTrue;
    var emailTrue;
    var adressTrue;
    var zipcodeTrue;
    var phonenrTrue;
    var password1True;
    var password2True;

    if(username1Value === '') {
      setErrorFor(username1, 'Användarnamnet får inte vara blank');
    } else {
      setSuccessFor(username1);
        username1True = 1;
    }
	
	if(firstnameValue === '') {
		setErrorFor(firstname, 'Förnamn får inte vara blank');
	} else {
		setSuccessFor(firstname);
        firstnameTrue = 1;
	}

    if(lastnameValue === '') {
		setErrorFor(lastname, 'Efternamn får inte vara blank');
	} else {
		setSuccessFor(lastname);
        lastnameTrue = 1;
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'E-post får inte vara blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Inte en giltig E-post');
	} else {
		setSuccessFor(email);
        emailTrue = 1;
	}

    if(addressValue === '') {
		setErrorFor(address, 'Adressen får inte vara blank');
	} else {
		setSuccessFor(address);
        adressTrue = 1;
	}

    if(zipcodeValue === '') {
		setErrorFor(zipcode, 'E-post får inte vara blank');
	} else if (!isZipcode(zipcodeValue)) {
		setErrorFor(zipcode, 'Inte ett giltigt postnummer');
	} else {
		setSuccessFor(zipcode);
        zipcodeTrue = 1;
	}

    if(phonenrValue === '') {
		setErrorFor(phonenr, 'Telefonnummret får inte vara blank');
	} else if (!isPhoneNr(phonenrValue)) {
		setErrorFor(phonenr, 'Inte ett giltigt telefonnummer');
	} else {
		setSuccessFor(phonenr);
        phonenrTrue = 1;
	}

  if(password1Value === '') {
		setErrorFor(password1, 'Lösenordet får inte vara blank');
	} else if (!isPassword(password1Value)){
    setErrorFor(password1, '  Lösenordet måste bestå av minst 6 tecken och högst 16 tecken, minst en siffra: 1-9 och minst ett specialtecken: !,#,?');
  } else {
		setSuccessFor(password1);
    password1True = 1;
	}

	
	if(password2Value === '') {
		setErrorFor(password2, 'Lösenordet får inte vara blank');
	} else if(password1Value !== password2Value) {
		setErrorFor(password2, 'Lösenordet matchar inte');
	} else{
		setSuccessFor(password2);
    password2True = 1;
	}

    if (firstnameTrue === 1 && emailTrue === 1 && adressTrue === 1 && zipcodeTrue === 1 && phonenrTrue === 1 && password1True === 1 && password2True === 1){
        alert("Välkommen " + firstnameValue);
    } 

}

/**
 * Clears localStorage
 * Realoads the page
 */
/**
 * Sets error for input
 */
function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

/**
 * Sets succes for input
 */
function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
/**
 * Validates email with regex
 */
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

/**
 * Validates zipcode with regex
 */
function isZipcode(zipcode) {
	return  /^\d{3}\d{2}$/.test(zipcode);
}

/**
 * Validates phonenr with regex
 */
function isPhoneNr(phonenr) {
	return  /^(([+]46)\s*(7)|07)[02369]\s*(\d{4})\s*(\d{3})$/.test(phonenr);
}

function isPassword(password1) {
	return  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password1);
}