const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const address = document.getElementById('address');
const zipcode = document.getElementById('zipcode');
const city = document.getElementById('city');
const phonenr = document.getElementById('phonenr');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');
const url = './customerAPI.json';
let customers;
let loggedInUser;
loadData();

form.addEventListener('submit', e => {
	e.preventDefault();
	
		checkInputs();
	
});

function checkInputs() {
	

  const firstnameValue = firstname.value.trim();
  const lastnameValue = lastname.value.trim();
  const emailValue = email.value.trim();
  const addressValue = address.value.trim();
  const zipcodeValue = zipcode.value.trim();
  const cityValue = city.value.trim();
  const phonenrValue = phonenr.value.trim();
  const password1Value = password1.value.trim();
  const password2Value = password2.value.trim();

    var firstnameTrue;
    var lastnameTrue;
    var emailTrue;
    var adressTrue;
    var zipcodeTrue;
    var phonenrTrue;
    var password1True;
    var password2True;
	var cityTrue;

	if(firstnameValue === '') {
		setErrorFor(firstname, 'Förnamn får inte vara blankt');
	} else if (!nameRegex(firstnameValue)) {
		setErrorFor(firstname, 'Ogiltigt format');
	}else {
		setSuccessFor(firstname);
        firstnameTrue = 1;
	}

	if(lastnameValue === '') {
		setErrorFor(lastname, 'Efternamn får inte vara blankt');
	}else if (!nameRegex(lastnameValue)) {
		setErrorFor(lastname, 'Ogiltigt format');
	} else {
		setSuccessFor(lastname);
        lastnameTrue = 1;
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'E-post får inte vara blankt');
	} else if (checkUserInfo(emailValue)) {
		setErrorFor(email, 'Kontot finns redan');
	} else if (!emailRegex(emailValue)) {
		setErrorFor(email, 'Ogiltigt format');
	} else {
		setSuccessFor(email);
        emailTrue = 1;
	}

    if(addressValue === '') {
		setErrorFor(address, 'Adress får inte vara blankt');
	} else if (!addressRegex(addressValue)){
		setErrorFor(address, 'Ogiltigt format');
	} else {
		setSuccessFor(address);
        adressTrue = 1;
	}

    if(zipcodeValue === '') {
		setErrorFor(zipcode, 'Postnummer får inte vara blankt');
	} else if (!zipCodeRegex(zipcodeValue)) {
		setErrorFor(zipcode, 'Ogiltigt format');
	} else {
		setSuccessFor(zipcode);
        zipcodeTrue = 1;
	}

	if(cityValue === '') {
		setErrorFor(city, 'Postort får inte vara blankt');
	} else if (!cityRegex(cityValue)) {
		setErrorFor(city, 'Ogiltigt format');
	} else {
		setSuccessFor(city);
        cityTrue = 1;
	}

    if(phonenrValue === '') {
		setErrorFor(phonenr, 'Telefonnummer får inte vara blankt');
	} else if (!phoneRegex(phonenrValue)) {
		setErrorFor(phonenr, 'Ogiltigt format');
	} else {
		setSuccessFor(phonenr);
        phonenrTrue = 1;
	}

  if(password1Value === '') {
		setErrorFor(password1, 'Lösenord får inte vara blankt');
	} else if (!passwordRegex(password1Value)){
    	setErrorFor(password1, 'Ditt lösenord måste vara minst 8 tecken, minst en bokstav, minst en siffra');
  } else {
		setSuccessFor(password1);
    password1True = 1;
	}

	
	if(password2Value === '') {
		setErrorFor(password2, 'Lösenord får inte vara blankt');
	} else if(password1Value !== password2Value) {
		setErrorFor(password2, 'Lösenordet matchar inte');
	} else{
		setSuccessFor(password2);
    password2True = 1;
	}

    if (firstnameTrue === 1 && emailTrue === 1 && adressTrue === 1 && zipcodeTrue === 1 && phonenrTrue === 1 && password1True === 1 && password2True === 1 && cityTrue === 1){
        alert("Välkommen " + firstnameValue + ". Du kan nu logga in!");

		const userIs = "customer"; 

		let url = 'https://hakimlivsdb.herokuapp.com/customer/add/' + firstnameValue + '/' + lastnameValue + '/' + emailValue + '/' + password1Value + '/' + addressValue + '/' + zipcodeValue + '/' + cityValue + '/' + userIs

        axios.get(url)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

		window.location.href = 'login.html';
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

function checkUserInfo(email){
	let isInDatabase = false;
    customers.forEach(customer => {
        if(customer.email == email){
            isInDatabase = true;
			loggedInUser = customer;
        }	
    });
    return isInDatabase;
}

function loadData(){
    fetch(url)
    .then(resp => resp.json())
    .then(function(data) {
       customers = data;
       return customers;
    });
}