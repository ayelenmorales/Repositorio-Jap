function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesWrapper").innerHTML = htmlContentToAppend;
    }
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
        
        <i class="fas fa-caret-left fa-3x"></i>
        <div class="col-11 comment-body">
            
            <div class="comment-header d-flex flex-wrap justify-content-between">
            <b>` + com.user + `</b>  
            <p>` + com.dateTime + `</p> </div>
            
            <div class="rating-stars mb-2" id="rating` + i + `">` + star + `</div>
            <p><i>` + com.description + `</i></p>
            <hr width=900>
            
           
        </div>
        </div>
        `

        document.getElementById("commentProduct").innerHTML = dataComments;

    }

    
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


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
            product.relatedProducts.forEach(function(productIndex){
                let tempProd = products[productIndex];
                htmlRelProd += `
                <div class="card" style="width: 18rem;">
                    <img src="${tempProd.imgSrc}" class="card-img-top" alt="...">
                    <div class="card body">
                        <h5 class="car-title">${tempProd.name}<h5/>
                        
                    </div>
                </div> `
                        
            });       
                   
            let htmlRelProdHTML = document.getElementById("relatedProd");
            htmlRelProdHTML.innerHTML = htmlRelProd       
              
                   
                   
                   
                       
        } 
        
    });             
    

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentCommentsArray = resultObj.data;

            showComments();
        }
    });
});


