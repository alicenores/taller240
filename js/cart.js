let articulos = [];
let subtotalProducto = 1;
let porcentaje = 0.15;
let DOLLAR_SYMBOL = "USD ";

function showArticle(array){
    let htmlContentToAppend = "";
    for(i=0; i < array.articles.length; i++){ 
    let articulo = array.articles[i]; {
        let moneda = articulo.currency;
        htmlContentToAppend += `
        <table class="table align-middle">
         <thead>
          <tr>
          <th scope="col"></th>
          <th scope="col">Nombre</th>
          <th scope="col">Costo</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Sub total</th>
          </tr>
         </thead>
         <tbody>
          <tr>
          <th scope="row"><img src="${articulo.image}" width="100"></th>
          <td>${articulo.name}</td>
          <td><p>${moneda} <span id="precio">${articulo.unitCost}</span></p></td>
          <td><input onchange="subTotal(${articulo.unitCost})" type="number" min="1" class="form-label" id="cantidadArt" value="${articulo.count}" name="numero"></td>
          <td><p>${moneda} <span id="subTotal">${articulo.unitCost}</span></p></td>
          </tr>
         </tbody>
        </table>
        `
    }
    document.getElementById("articulos").innerHTML = htmlContentToAppend;
    };
    
};

function subTotal(precio){
    let cantidad = parseInt(document.getElementById("cantidadArt").value);
    let subTotal = (precio*cantidad);
    document.getElementById("subTotal").innerHTML = subTotal;
    localStorage.setItem("subTotal", subTotal); //Carga el subtotal a localStorage
}

//Función para calcular costos
function subtotalGeneral(){
    let total = "";

    let sumaSubtotal = localStorage.getItem("subTotal");
    let costoEnvio = parseInt(Math.round((sumaSubtotal * porcentaje)));
    total = parseInt(costoEnvio) + parseInt(sumaSubtotal);

    document.getElementById("subtotalText").innerHTML = DOLLAR_SYMBOL + sumaSubtotal;
    document.getElementById("envioText").innerHTML = DOLLAR_SYMBOL + costoEnvio;
    document.getElementById("totalText").innerHTML = DOLLAR_SYMBOL + total;
};

document.addEventListener('DOMContentLoaded', function(e){
    logueado(); 
    

    getJSONData(CART_INFO_URL+'25801'+EXT_TYPE).then(function(resultObj){ //concatena url+constante con id+constante ".json"
        if (resultObj.status === "ok"){
           articulos = resultObj.data;   
        } showArticle(articulos);
    });

    document.getElementById("premiumradio").addEventListener("change", function(){
        porcentaje = 0.15;
        subtotalGeneral();
    });

    document.getElementById("expressradio").addEventListener("change", function(){
        porcentaje = 0.07;
        subtotalGeneral();
    });

    document.getElementById("estandarradio").addEventListener("change", function(){
        porcentaje = 0.03;
        subtotalGeneral();
    });

    desactivado();

});
// Ejemplo de JavaScript inicial para deshabilitar el envío de formularios si hay campos no válidos
(function () {
    'use strict'
  
    // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
    var forms = document.querySelectorAll('.needs-validation')
  
    // Bucle sobre ellos y evitar el envío
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          
          //validar() funciona en tiempo real 
          ['change', 'input'].forEach(evento => { document.body.addEventListener(evento, validar) })

          validar();

          form.classList.add('was-validated')
          if(form.checkValidity()){
            Swal.fire({
            position: 'top',
            icon: 'success',
            title: '¡Has comprado con éxito!',
            showConfirmButton: false,
            timer: 3500
          })}
        }, false)
        
      })

  })();


function validar(){
    let tarjeta = document.getElementById("tarjetaCredito");
    let transferencia = document.getElementById("transferencia");


    if(!tarjeta.checked && !transferencia.checked){
        document.getElementById("invalidCheck3Feedback").style.display = "inline";
        return false;
      } else {
        document.getElementById("invalidCheck3Feedback").style.display = "none";
      }
    };

function desactivado(){
    
    document.getElementById("tarjetaCredito").addEventListener('click', function(e){
        document.getElementById("numCuenta").disabled = true;
        document.getElementById("formaDePago").innerHTML = "Tarjeta de crédito"
        document.getElementById("numeroTarjeta").disabled = false;
        document.getElementById("codSeguridad").disabled = false;
        document.getElementById("vencimiento").disabled = false;
    });

    document.getElementById("transferencia").addEventListener('click', function(e){
        document.getElementById("numeroTarjeta").disabled = true;
        document.getElementById("codSeguridad").disabled = true;
        document.getElementById("vencimiento").disabled = true;
        document.getElementById("formaDePago").innerHTML = "Transferencia bancaria"
        document.getElementById("numCuenta").disabled = false;
    });
};