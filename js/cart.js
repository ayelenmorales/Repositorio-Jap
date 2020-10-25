
let MONEY_SYMBOL = "$ ";
let shippingPercentage = 0.15;

function desProductsCart() {//Genera tabla inicial
    
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
        <td><button onclick="elimArt(`+i+`)" class="badge badge-primary badge-pill"> X </button></td>
       
      </tr>`
            
          document.getElementById("articlesWrapper").innerHTML = desProdList;
          
    } 

    Update();
            
}

function Update(){//Actualiza valores carro

    sumProdTot = parseInt(document.getElementById("cant"+ 0).value) * carrito.articles[0].unitCost + carrito.articles[1].unitCost * 40 * parseInt(document.getElementById("cant"+ 1).value)
    document.getElementById("productSubTotal1").innerHTML = MONEY_SYMBOL + sumProdTot
    shippingCost = sumProdTot * shippingPercentage;
    shippingCost = parseInt(shippingCost);
    total = sumProdTot + shippingCost
    document.getElementById("shippingCost").innerHTML = MONEY_SYMBOL + shippingCost;
    document.getElementById("totalCost").innerHTML = MONEY_SYMBOL + total

    
}



function elimArt(id){//Función que elimina artículos del carro(desafiate)
    document.getElementById("tr"+ id).remove();
    
    
    
}




function desSubTotal() {//Función que calcula el sub total por producto y el total de producto
    
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
            Update();
            sumCantProd();

        
        });
        
        
    }


}

function cardChecked(){//Imprime en pantalla que se seleccionó tarjeta

    document.getElementById("medioPagoselec").innerHTML = `<p> Ha seleccionado <b>Tarjeta de Crédito</b> </p>`
    
}

function bankChecked(){//Imprime en pantalla que se seleccionó Cuenta

    document.getElementById("medioPagoselec").innerHTML = `<p> Ha seleccionado <b>Transferencia bancaria<b> </p>`
    
}

function sumCantProd(){//Función que suma los productos totales del carro
    let cantProd = carrito.articles.length;
    let cantProdCount =0;
    for (var i =0; i < cantProd; i++){
        cantProdCount+= parseInt(document.getElementById("cant"+ i).value)
    }
    document.getElementById("contArt").innerHTML = cantProdCount
     
    
}

//finalmente no se utiliza
function cartByMsg(){

    alert (mensaje.msg)
    
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
            sumCantProd()
            //desProdTotal()
            
            
        }
        //Se generan eventos para recalcular envio según cambia
        document.getElementById("express").addEventListener("change", function(){
            shippingPercentage = 0.07;
            Update();
        });
        
        document.getElementById("premium").addEventListener("change", function(){
            shippingPercentage = 0.15;
            Update();
        });
        
        document.getElementById("standard").addEventListener("change", function(){
            shippingPercentage = 0.05;
            Update();
        });
    });

    //No aplican-Se dejan para seguir trabajando para entrega final
    /*function ocultarTransferencia(){
        document.getElementById("cc-name1").disabled = true;
        document.getElementById("cc-number1").disabled = true;
        document.getElementById("cc-expiration1").disabled = true;
        document.getElementById("cc-name").disabled = false;
        document.getElementById("cc-number").disabled = false;
        document.getElementById("ccmonth").disabled = false;
        document.getElementById("ccyear").disabled = false;
        document.getElementById("cvv").disabled = false;
    }*/
    
   /* function ocultartarjeta(){
    
        document.getElementById("cc-name1").disabled = false;
        document.getElementById("cc-number1").disabled = false;
        document.getElementById("cc-expiration1").disabled = false;
        document.getElementById("cc-name").disabled = true;
        document.getElementById("cc-number").disabled = true;
        document.getElementById("ccmonth").disabled = true;
        document.getElementById("ccyear").disabled = true;
        document.getElementById("cvv").disabled = true;
    }*/
    
    
    //validación del formulario
    var infocart = document.getElementById("cart-info");
    infocart.addEventListener("submit", function(e){
    
        let calle = document.getElementById("calle");
        let numero = document.getElementById("numeroCalle");
        let pais = document.getElementById("pais");
        let esquina = document.getElementById("esquina");
        let departamento = document.getElementById("departamento");
        let infoMissing = false;
    
        calle.classList.remove('is-invalid');
        numero.classList.remove('is-invalid');
        pais.classList.remove('is-invalid');
        esquina.classList.remove('is-invalid');
        departamento.classList.remove('is-invalid');
    
        if (calle.value === "")
        {
            calle.classList.add('is-invalid');
            infoMissing = true;
        }
    
        if (numero.value <=0)
        {
            numero.classList.add('is-invalid');
            infoMissing = true;
        }
    
        if (pais.value === "")
        {
            pais.classList.add('is-invalid');
            infoMissing = true;
        }
    
        if (esquina.value === "")
        {
            esquina.classList.add('is-invalid');
            infoMissing = true;
        }

        if (departamento.value === "")
        {
            departamento.classList.add('is-invalid');
            infoMissing = true;
        }
    
        if(!infoMissing)//En este moemento no mustra el mensaje
            {getJSONData(CART_BUY_URL).then(function(resultObj){
                let msgToShowHTML = document.getElementById("resultSpan1");
                let msgToShow = "";
    
                //Si la publicación fue exitosa, devolverá mensaje de éxito,
                //de lo contrario, devolverá mensaje de error.
                if (resultObj.status === 'ok')
                {
                    msgToShow = resultObj.data.msg;
                    document.getElementById("alertResult1").classList.add('alert-success');
                }
                else if (resultObj.status === 'error')
                {
                    msgToShow = ERROR_MSG;
                    document.getElementById("alertResult1").classList.add('alert-danger');
                }
    
                msgToShowHTML.innerHTML = msgToShow;
                document.getElementById("alertResult1").classList.add("show");
                });
            }
    
            if (e.preventDefault) e.preventDefault();
            return false;
    });

});


