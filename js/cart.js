let articulos = [];


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
          <td><p>${moneda}</p><p id="precio">${articulo.unitCost}</p></td>
          <td><input onchange="subTotal(${articulo.unitCost})" type="number" min="1" class="form-label" id="cantidadArt" value="${articulo.count}" name="numero"></td>
          <td><p>${moneda}</p><p id="subTotal">${articulo.unitCost}</p></td>
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
}

document.addEventListener('DOMContentLoaded', function(e){
    logueado(); 

    getJSONData(CART_INFO_URL+'25801'+EXT_TYPE).then(function(resultObj){ //concatena url+constante con id+constante ".json"
        if (resultObj.status === "ok"){
           articulos = resultObj.data;   
        } showArticle(articulos);
    });

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