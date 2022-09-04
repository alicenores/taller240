function validar() {
    let email = document.getElementById('email').value; //variable que contiene el valor de elemento por Id
    let clave = document.getElementById('clave').value; //variable que contiene el valor de elemento por Id

    if(email === "" || clave === ""){
        alert("Debe completar todos los campos");
    }else{
        localStorage.setItem('user', email); //crea un elemento en localStorage que va a guardar el valor de email con el nombre user
        location.href="index.html"; //redirecciona a index
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('envio').addEventListener('click',()=>{
        validar();
    })
});