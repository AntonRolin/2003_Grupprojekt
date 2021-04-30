let openingHours = "13:00-20:00";
let phonenumber = "070000000";
let aboutustitle = "Om oss";
let storeimage = "images/mahmoud-chouman-hbg-city-handel-webb.jpg";
let aboutustext = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
let imgurl = "<img src='" + storeimage + "' alt='Hakim Livs' width='500' height='333'>";


const openTimesMessage = document.getElementById("openTimes");
const contactnumberMessage = document.getElementById("contactNumber");
const aboutusMessage = document.getElementById("aboutus");
const storeimgMessage = document.getElementById("storeimg");
const aboutustextMessage = document.getElementById("aboutusDescription");

setOpenTimes();
setContactNumber();
setAboutus();
setAboutustext();
setStoreimg();


function setOpenTimes() {
    openTimesMessage.innerHTML = `<p class="lead fw-bold">Öppettider</p><p class="lead">${openingHours}</p><hr>`;
}

function setContactNumber() {
    //contactnumberMessage.innerHTML = `<p class="lead fw-bold">Kontakta butiken</p><p class="lead">${phonenumber}</p>`;
}

function setStoreimg(){
    document.getElementById('imageBox').src = storeimage;
} 

function setAboutus(){
    aboutusMessage.innerHTML = `${aboutustitle}`;
}

function setAboutustext(){
    aboutustextMessage.innerHTML = `${aboutustext}`;
} 
