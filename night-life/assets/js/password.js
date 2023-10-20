let passwordInput = document.getElementById("passwordInput")
let confirmPasswordInput = document.getElementById("confirmPasswordInput")
let hidePassword = document.getElementById("hidePassword")
let seePassword = document.getElementById("seePassword")
let confirmHidePassword = document.getElementById("confirmHidePassword")
let confirmSeePassword = document.getElementById("confirmSeePassword")

seePassword.addEventListener("click", ()=>{
    passwordInput.type = "text"
    hidePassword.style.display = "block"
    seePassword.style.display = "none"
})
hidePassword.addEventListener("click", ()=>{
    passwordInput.type = "password"
    hidePassword.style.display = "none"
    seePassword.style.display = "block"
})



confirmSeePassword.addEventListener("click", ()=>{
    confirmPasswordInput.type = "text"
    confirmHidePassword.style.display = "block"
    confirmSeePassword.style.display = "none"
})
confirmHidePassword.addEventListener("click", ()=>{
    confirmPasswordInput.type = "password"
    confirmHidePassword.style.display = "none"
    confirmSeePassword.style.display = "block"
})


