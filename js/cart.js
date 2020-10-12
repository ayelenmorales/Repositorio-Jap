
function desProductsCart() {
    
    let desProdList ="";
    for (let i = 0; i < carrito.articles.length; i++) {

        subTotal = carrito.articles[i].unitCost * carrito.articles[i].count 

        desProdList +=`
            
        <tr Id="tr`+ i +`"> 
        <td class="text-center" id="nomProduct"> 
            <img src='`+ carrito.articles[i].src + `' width ="60px">
        </td>
        <td>
            <h6 class="my-0">`+carrito.articles[i].name+`</h6>
        </td>
        <td class="text-muted">
            <spam id="price`+ i +`">`+carrito.articles[i].currency+` `+ carrito.articles[i].unitCost +`</spam>
        </td>
        <td class="cant">
            <input class="form-control cant" type="number" id="cant`+ i +`" min="1" value="`+ carrito.articles[i].count +`">
        </td>
        <td class="my-0 text-center">
            <h6 id="productSubtotal`+ i +`">`+carrito.articles[i].currency+` `+ subTotal +`</h6>
        </td>
       
      </tr>`
            
          document.getElementById("articlesWrapper").innerHTML = desProdList;
          
    } 
}




function desSubTotal() {
    
    var input = document.getElementsByClassName("cant");

    
    for (var i=0; i< input.length; i++) {
        
        input[i].addEventListener("change",function() {
            idCant = this.id
            let cant = document.getElementById(idCant).value;
            let idPrice;
            let price ="";
            let arrPrice = []; 
            let comparacion = "";
            let idSubTotal = ""; 
            
            for (let b = 0; b < input.length; b++) {
                comparacion = "cant"+b;
                idSubTotal = "productSubtotal"+b;
                if (idCant === comparacion) {
                    idPrice = "price"+b;
                    valorPrice = document.getElementById(idPrice).textContent;
                    arrPrice = valorPrice.split(" ")
                    price = arrPrice[1]
                    break;
                }
            }
            let subTotal =   price * cant ;
            document.getElementById(idSubTotal).innerHTML = `<h6 id="`+ idSubTotal+`">`+ arrPrice[0] + " "+subTotal +`</h6>`

        
        });
    }

}








//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(DES_PRODUCT_INFO_URL).then(function(resultObj){ 
        if (resultObj.status === "ok") {
            carrito = resultObj.data;

            desProductsCart();
            desSubTotal();
            
            
        }
    });

    
   

});


