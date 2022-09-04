document.addEventListener("DOMContentLoaded", function(){
    let email = localStorage.getItem("user");

    if(email == null){
        alert("Debe iniciar sesión");
        location.href="login.html";
    }else{
        document.getElementById("usuario").innerHTML = email;
    }

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});