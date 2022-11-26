let productInfo = [];
let comments = [];

function showProduct(array){ //funcion que muestra los productos 

    let htmlContentToAppend = "";
        let prodInfo = array; { 

        htmlContentToAppend += ` 
        <div class="container">
         <div class="row">
          <div class="col">
          <h1 class="fw-bold p-2">`+ prodInfo.name + `</h1> 
          </div>
        <hr>
          <div class="col-12 col-md-6 p-4">
          <p class="display-6" id="prodMoneda">`+ prodInfo.currency +`</p><p class="display-6" id="prodCosto">`+ prodInfo.cost +`</p>
          <p><span class="fw-bold fs-5">Descripción</span> <br> `+ prodInfo.description +`</p>
          <p><span class="fw-bold fs-5">Categoría</span> <br>`+ prodInfo.category +`</p>
          <p><span class="fw-bold fs-5">Cantidad de vendidos</span> <br>`+ prodInfo.soldCount +`</p>
          
          </div>
          <div class="col-12 col-md-6 p-4">
           <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
             <div class="carousel-item active">
              <img src="` + prodInfo.images[0] + `" class="d-block w-100" alt="product image" id="prodImg">
             </div>
             <div class="carousel-item">
              <img src="` + prodInfo.images[1] + `" class="d-block w-100" alt="product image">
             </div>
             <div class="carousel-item">
              <img src="` + prodInfo.images[2] + `" class="d-block w-100" alt="product image">
             </div>
             <div class="carousel-item">
              <img src="` + prodInfo.images[3] + `" class="d-block w-100" alt="product image">
             </div>
             <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
             </button>
             <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
             </button>
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
                <div class="d-flex w-100 justify-content-between">
                 <h5 class="mb-1">${comment.user}</h5>
                 <small>${estrellita}</small>
                </div>
                <p class="mb-1">${comment.description}</p>
                <small>${comment.dateTime}</small>
                </div>
                `
            }
            document.getElementById("comments-container").innerHTML = htmlContentToAppend;
        }
    };

    function addComment(){
        let usuario = localStorage.getItem("user");
        let comentario = document.getElementById("productDescription").value;
        let puntuacion = JSON.parse(document.getElementById("productCategory").value);
        let hoy = new Date();// crea un nuevo objeto `Date`
        let fecha = hoy.toLocaleString();// obtener la fecha y la hora
        
        let newComment = {
            score: puntuacion,
            description: comentario,
            user: usuario,
            dateTime: fecha
        }
        localStorage.setItem('newComment', JSON.stringify(newComment));
        comments.push(newComment);
        console.log(comments);
    }

    function setProdID(id) { //Función que guarda el id del producto
        localStorage.setItem("prodID", id);
        window.location = "product-info.html"
    };

    function showRelatedProducts(array){ //Función que muestra los productos relacionados

        let htmlContentToAppend = "";
        for(let i = 0; i < array.relatedProducts.length; i++){ //recorre la longitud del arreglo relatedProducts
        let prodInfo = array; { 

        htmlContentToAppend += ` 
            <div onclick="setProdID(${prodInfo.relatedProducts[i].id})" class="col-3 py-2 mx-0">
                <img src="` + prodInfo.relatedProducts[i].image + `" alt="product image" class="img-thumbnail">
                <p class="mt-2">${prodInfo.relatedProducts[i].name}</p>
            </div>
        `
    }
    document.getElementById("oProd-container").innerHTML = htmlContentToAppend; //se agrega el codigo al html
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
              showRelatedProducts(productInfo);
        });
        
        getJSONData(PRODUCT_INFO_COMMENTS_URL+idProducto+EXT_TYPE).then(function(resultObj){ //concatena url+constante con id+constante ".json"
            if (resultObj.status === "ok"){
               comments = resultObj.data;   
            } showComments(comments);
        });
        
        document.getElementById("btnComment").addEventListener('click', function(){
            addComment();
            showComments(comments);
        })
    });