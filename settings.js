let openingHours = "13:00-20:00";
let phonenumber = "070000000";
const openTimesMessage = document.getElementById("openTimes");
const contactnumberMessage = document.getElementById("contactNumber");

setOpenTimes();
setContactNumber();

function setOpenTimes() {
    openTimesMessage.innerHTML = `Öppettider: ${openingHours}`;
}

function setContactNumber() {
    contactnumberMessage.innerHTML = `Kontakt: ${phonenumber}`;
}


