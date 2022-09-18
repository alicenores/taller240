const ORDER_ASC_BY_COST = "1-10"; //constante para orden ascendente
const ORDER_DESC_BY_COST = "10-1"; //constante para orden descendente
const ORDER_BY_PROD_COUNT = "Precio"; //constante para orden por cant de productos
let products = []; //array vacio para guardar elementos
let currentSortCriteria = undefined; //variable indefinida, criterios de clasificacion
let minCount = undefined; //variable indefinida, minimo
let maxCount = undefined; //variable indefinida, maximo

function sortProducts(criteria, array){ //funcion con dos parametros(uno array)
    let result = []; //array vacio para depositar elementos
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; } //a en un indice menor que b
            if ( a.cost > b.cost ){ return 1; } //b en un indice menor que a
            return 0; 
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; } //a en un indice menor que b
            if ( a.cost < b.cost ){ return 1; } //b en un indice menor que a
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount); 
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; } //a en un indice menor que b
            if ( aCount < bCount ){ return 1; } //b en un indice menor que a
            return 0;
        });
    }

    return result;
};

function setProdID(id) { //Funcion que guarda el id de cada producto
    localStorage.setItem("prodID", id);
    window.location = "products-info.html"
};

function showProductsList(){ //funcion que muestra una lista con parametro array

    let htmlContentToAppend = "";  //
    for(let i = 0; i < productsArray.products.length; i++){ //variable i inicia en 0 y se incrementa hasta que sea < a extension de array.products 
        let products = productsArray.products[i]; 
    
        if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))){
       
        //codigo que se repite 
        htmlContentToAppend += ` 
        <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src="` + products.image + `" alt="product image" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                    <h4>`+ products.name + ' - ' + products.currency + ' ' + products.cost + `</h4> 
                    <p> `+ products.description +`</p> 
                    </div>
                    <small class="text-muted">` + products.soldCount + ` vendidos</small> 
                </div>
            </div>
        </div>
        </div>`
        }
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend; //se agrega el codigo al html
        
        }    
    };

    function sortAndShowProducts(sortCriteria, productsArray){ //ordena y muestra el listado
        currentSortCriteria = sortCriteria; //variable que comienza undefined pasa a ser la variable del parametro
    
        if(productsArray !== undefined){ //si el array del parametro no es undefined
            products = productsArray; //el array de productos va a ser el array del parametro
        }
    
        products = sortProducts(currentSortCriteria, products); //utiliza la funcion que ordena
    
        showProductsList(); //Muestra las categorías ordenadas
    };
    
    //cuando carga la pagina
    document.addEventListener("DOMContentLoaded", function(e){
        logueado(); 
        const idProducto = localStorage.getItem('catID'); //id desde localStorage en una constante

        getJSONData(PRODUCTS_URL+idProducto+EXT_TYPE).then(function(resultObj){ //concatena url+constante con id+constante ".json"
            if (resultObj.status === "ok")
            {
                productsArray = resultObj.data;
                showProductsList(productsArray);
                document.getElementById("bajadaTitulo").innerHTML += productsArray.catName; //se suma el nombre de la categoria en la bajada del titulo
            }
        });

        document.getElementById("sortAsc").addEventListener("click", function(){ 
            sortAndShowProducts(ORDER_ASC_BY_COST, productsArray.products);
        });
    
        document.getElementById("sortDesc").addEventListener("click", function(){
            sortAndShowProducts(ORDER_DESC_BY_COST, productsArray.products);
        });
    
        document.getElementById("sortByCount").addEventListener("click", function(){
            sortAndShowProducts(ORDER_BY_PROD_COUNT, productsArray.products);
        });
    
        document.getElementById("clearRangeFilter").addEventListener("click", function(){ //limpia el buscador
            document.getElementById("rangeFilterCountMin").value = "";
            document.getElementById("rangeFilterCountMax").value = "";
    
            minCount = undefined;
            maxCount = undefined;
    
            showProductsList();
        });
    
        document.getElementById("rangeFilterCount").addEventListener("click", function(){
            
            //Obtengo el mínimo y máximo de los intervalos para filtrar por precio de productos
            minCount = document.getElementById("rangeFilterCountMin").value;
            maxCount = document.getElementById("rangeFilterCountMax").value;
    
            if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
                minCount = parseInt(minCount);
            }
            else{
                minCount = undefined;
            }
    
            if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
                maxCount = parseInt(maxCount);
            }
            else{
                maxCount = undefined;
            }
    
            showProductsList();
        });
    });