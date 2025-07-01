const registerButton = document.getElementById("registerBtn");
const loginButton = document.getElementById("loginBtn");
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

registerButton.addEventListener("click", function(){
    registerForm.style.display = "block";
    loginForm.style.display = "none";
})

loginButton.addEventListener("click",function(){
    loginForm.style.display = "block";
    registerForm.style.display = "none";
})



