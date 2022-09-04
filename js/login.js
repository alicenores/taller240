function validar() {
    let email = document.getElementById('email').value;
    let clave = document.getElementById('clave').value;

    if(email === "" || clave === ""){
        alert("Debe completar todos los campos");
    }else{
        localStorage.setItem('user', email);
        location.href="index.html";
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('envio').addEventListener('click',()=>{
        validar();
    })
});