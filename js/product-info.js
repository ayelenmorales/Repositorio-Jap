function showImagesGallery(array){

    let htmlContentToAppend = "";
    let htmlCarrusel ="";
    htmlContentToAppend +=`
    <div class="carousel-item active">
        <img src="img/prod1.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
            <h5>${product.name}</h5>
        </div>
    </div>
    `
    htmlCarrusel +=` 
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="3000">
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
        </ol>
        <div id="innercarrusel" class="carousel-inner">
        </div> 
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>       
    </div>
    `

   

    document.getElementById("productImagesWrapper").innerHTML = htmlCarrusel;

    for(let i = 1; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="carousel-item">
            <img src="` + imageSrc + `" class="d-block w-100" alt="...">
            <div class="carousel-caption d-none d-md-block">
                <h5>${product.name}</h5>
            </div>
        </div>
        `

        document.getElementById("innercarrusel").innerHTML = htmlContentToAppend;
    }
}


function sentComment() {
    
    alert ("Tu calificación: -" + $('#productCommentDescription').val() +  "- ha sido enviada con éxito");
}



function showComments() {

    let dataComments = "";
    for (let i = 0; i < currentCommentsArray.length; i++) {
        let com = currentCommentsArray[i];
        
        
        let score = com.score - 1;
        let star = "";
        for (let i = 0; i < 5; i++) {
    
            if(i <= score){
                star += `<i class="fas fa-star checked"></i> `;
            }else{
                star += `<i class="fas fa-star"></i> `;
            }
            
        }  
         
        dataComments += `
        
    <div class="d-flex comment" id="comment">
        <div class="card" style="width: 60rem;">
            
            <div class="col-11 comment-body">
                
                <div class="comment-header d-flex flex-wrap justify-content-between">
                    
                    <b><i class="fas fa-check-circle">` +"  "+ com.user + `</i></b>  
                    <p>` + com.dateTime + `</p> </div>
            
                    <div class="rating-stars mb-2" id="rating` + i + `">` + star + `
                    
                    </div>

                        <p><i>` + com.description + `</i></p>
                        
            
           
                </div>
            </div>
        </div>
    </div>
        `

        document.getElementById("commentProduct").innerHTML = dataComments;

    }

    
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//Obtengo lainformación por producto.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productCostHTML = document.getElementById("productCost");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productsoldCountHTML = document.getElementById("productsoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
        
            productNameHTML.innerHTML = product.name;
            productCostHTML.innerHTML = product.currency + " " + product.cost;
            productDescriptionHTML.innerHTML = product.description;
            productsoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

            

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
            
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            let products = resultObj.data;
    
            let htmlRelProd= '';
            product.relatedProducts.forEach(function(proIndex){
                let tempProd = products[proIndex];
                htmlRelProd += `
                <div class="card" style="width: 18rem; shadow-sm custom-card">
                    <div class="card-body">
                        <img src="${tempProd.imgSrc}" class="card-img-top" alt="...">
                        <h5 class="car-title"><b>${tempProd.name}</b><h5/>
                        <p class="card-text"> ${tempProd.description}<p/>
                        <p class="text-center">
                            <a href="products.html" class="btn btn-dark">Ver</a>
                        </p>
                        
                    </div>    
                </div> `
                        
            });       
                   
            let htmlRelProdHTML = document.getElementById("relatedProd");
            htmlRelProdHTML.innerHTML = htmlRelProd       
              
                   
                   
                   
                       
        } 
        
    });             
    
    //<div class="card" style="width: 18rem;">
  //<img src="..." class="card-img-top" alt="...">
  //<div class="card-body">
    //<h5 class="card-title">Card title</h5>
    //<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //<a href="#" class="btn btn-primary">Go somewhere</a>
  //</div>
    //</div>

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentCommentsArray = resultObj.data;

            showComments();
        }
    });

    
});


