const profileOrLogin = document.getElementById('profileOrLogin');
const loginButton = document.getElementById("loginButton");
const cartButton = document.getElementById("cartButton");
let cart_Products = JSON.parse(localStorage.getItem('cartProducts'));

initaliseLayout();

function loginButtonEvent() {
    window.location.href = 'login.html';
}

function myProfileButtonEvent(){
    window.location.href = 'my_profile.html';
}

function cartButtonEvent() {
    window.location.href = 'cart.html';
}

function initaliseLayout(){
    let user = JSON.parse(localStorage.getItem('user'));
    
        if(user == null){
            profileOrLogin.innerHTML = '<Button type="button" class="btn-lg btn-primary ms-2 mb-3" id="loginButton" onclick="loginButtonEvent()"><i class="bi bi-person"></i> Logga in</Button>';
        }else{
            profileOrLogin.innerHTML = '<Button type="button" class="btn-lg btn-primary ms-2 mb-3" id="profileButton" onclick="myProfileButtonEvent()"><i class="bi bi-person"></i> Profil</Button>';
        }
        
        cartButton.innerHTML = `<i class="bi bi-cart"></i> Varukorg (${cart_Products.length})`;
}
