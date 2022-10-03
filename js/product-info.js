let productInfo = [];
let comments = [];

function showProduct(array){ //funcion que muestra los productos 

    let htmlContentToAppend = ""; 
        let prodInfo = array; { 

        htmlContentToAppend += ` 
        <div>
         <h1 class="fw-bold">`+ prodInfo.name + `</h1>
         <hr>
         <p class="fw-bold fs-5">Precio</p>
         <p> `+ prodInfo.currency + " " + prodInfo.cost +`</p>
         <p class="fw-bold fs-5">Descripcion</p>
         <p> `+ prodInfo.description +`</p>
         <p class="fw-bold fs-5">Categoria</p>
         <p> `+ prodInfo.category +`</p>
         <p class="fw-bold fs-5">Cantidad de vendidos</p>
         <p> `+ prodInfo.soldCount +`</p>
         <p class="fw-bold fs-5">Imagenes ilustrativas</p>
        <div class="row">
            <div class="col-3">
                <img src="` + prodInfo.images[0] + `" alt="product image" class="img-thumbnail">
            </div>
            <div class="col-3">
            <img src="` + prodInfo.images[1] + `" alt="product image" class="img-thumbnail">
            </div>
            <div class="col-3">
                <img src="` + prodInfo.images[2] + `" alt="product image" class="img-thumbnail">
            </div>
            <div class="col-3">
                <img src="` + prodInfo.images[3] + `" alt="product image" class="img-thumbnail">
            </div>
        </div>
        </div>
        `
        }
        document.getElementById("prod-container").innerHTML = htmlContentToAppend; //se agrega el codigo al html
        };   
        
    function showComments(array){
        
        let htmlContentToAppend = "";
        for(let i = 0; i < array.length; i++){
            let comment = array[i]; {
            let puntaje = comment.score //variable que toma el puntaje de cada comentario
            let estrellita = ""; // variable vacia para agregar las estrellas necesarias
            for(let i = 1; i<=5; i++){ //recorrido del 1 al 5 para saber cuantas estrellas poner
                if(i<=puntaje){
                    estrellita += '<i class="fa fa-star checked"></i>'
                }
            }
                htmlContentToAppend += `
                <div class="list-group-item">
                    <div class="row">
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <p class="fw-bold mb-1">${comment.user}</p>
                                <small class="text-muted">${comment.dateTime}</small>
                            </div>
                            <p class="mb-1">${comment.description}</p>
                            <span>` + estrellita + `</span>
                        </div>
                    </div>
                </div>
                `
            }
    
            document.getElementById("comments-container").innerHTML = htmlContentToAppend;
        }
    };

    //cuando carga la pagina
    document.addEventListener('DOMContentLoaded', function(e){
        logueado(); 
        const idProducto = localStorage.getItem('prodID'); //id desde localStorage en una constante
        
        getJSONData(PRODUCT_INFO_URL+idProducto+EXT_TYPE).then(function(resultObj){ //concatena url+constante con id+constante ".json"
            if (resultObj.status === "ok"){
               productInfo = resultObj.data;   
            } showProduct(productInfo);
        });
        
        getJSONData(PRODUCT_INFO_COMMENTS_URL+idProducto+EXT_TYPE).then(function(resultObj){ //concatena url+constante con id+constante ".json"
            if (resultObj.status === "ok"){
               comments = resultObj.data;   
            } showComments(comments);
        });
    });