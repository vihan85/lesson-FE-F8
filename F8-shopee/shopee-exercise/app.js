 var discriptionBtn = document.getElementsByClassName('modal');
var overlay = document.getElementsByClassName('modal__overlay');



function showModal(){
    discriptionBtn[0].classList.add("show")
  overlay[0].classList.add("show")
 }
const showLogin = document.getElementById("auth-form-rigister");
const showRegister = document.getElementById("js-auth-form-login");

function transLogin (){
    showRegister.classList.remove("js-show-login-form");
    showLogin.classList.add("js-show-login-form");
}

function transrigister (){
    showRegister.classList.add("js-show-login-form");
    showLogin.classList.remove("js-show-login-form");
}

// out-modal

function outModal(){
    discriptionBtn[0].classList.remove("show")
}

// Show history
// const inputBtn = document.getElementsByClassName('js-btn-show-history');
// const history = document.getElementsByClassName('header__search-history');
// const main = document.getElementsByClassName('main')
// function showHistory() {
//     history[0].classList.add('js-show-history');   
// }
// inputBtn[0].addEventListener("click", showHistory);

// hidden history
// function closeHistory() {
//     history[0].classList.remove('js-show-history')
// }
// main[0].addEventListener('click', closeHistory)




