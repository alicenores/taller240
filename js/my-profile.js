function guardar(){ //Toma el valor de los inputs y crea un objeto con éstos
let nombre = document.getElementById("nombre").value;
let segundoNombre = document.getElementById("segundoNombre").value;
let apellido = document.getElementById("apellido").value;
let segundoApellido = document.getElementById("segundoApellido").value;
let tel = document.getElementById("telefono").value;

let usuario = {
    nombre: nombre,
    segundoNombre: segundoNombre,
    apellido: apellido,
    segundoApellido: segundoApellido,
    telefono: tel,
};

localStorage.setItem('datosUsuario', JSON.stringify(usuario));
};

function mostrar(){ //Trae a "datosUsuario" desde localStorage para usar los datos cargados en él y agregarlos a los inputs
    let usuario = {}
    usuario = JSON.parse(localStorage.getItem("datosUsuario"));

    document.getElementById("nombre").value = usuario.nombre;
    document.getElementById("segundoNombre").value = usuario.segundoNombre;
    document.getElementById("apellido").value = usuario.apellido;
    document.getElementById("segundoApellido").value = usuario.segundoApellido;
    document.getElementById("telefono").value = usuario.telefono;
};

document.addEventListener('DOMContentLoaded', function(){
    logueado();

    let usuario = localStorage.getItem('user');
    document.getElementById("email").value = usuario; //Agrega el email al input desde localStorage

    document.getElementById("guardar").addEventListener('click', function(){
        guardar();
    })
    
    mostrar();
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()