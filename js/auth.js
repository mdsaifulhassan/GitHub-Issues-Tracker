// check login before accessing index.html
if(localStorage.getItem("isLoggedIn") !== "true"){
    window.location.href = "login.html"
}