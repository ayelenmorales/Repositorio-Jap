function guardarProf(){

    var pUsuario = document.getElementById("userloga").innerHTML;
    var pNombre = document.getElementById("nombres").value;
    var pApellido = document.getElementById("apellidos").value;
    var pEdad = document.getElementById("edad").value;
    var pEmail = document.getElementById("exampleInputEmail1").value;
    var pTel = document.getElementById("tel").value;
    var miPerfil = {'nombre': pNombre, 'apellido': pApellido, 'edad': pEdad, 'email': pEmail, 'tel': pTel};
    localStorage.setItem(pUsuario, JSON.stringify(miPerfil));
    cargarGrilla();

}


function grillaInicial(){
    var usuario = document.getElementById("userloga").innerHTML;
    var perfil = localStorage.getItem(usuario);
    if(!(perfil === null)){
        cargarGrilla();
    }
}

function cargarGrilla(){
    var pUsuario = document.getElementById("userloga").innerHTML;
    var itemPerfil = localStorage.getItem(pUsuario);
    var perfil = JSON.parse(itemPerfil);
    document.getElementById("nombres").placeholder = perfil.nombre;
    document.getElementById("apellidos").placeholder = perfil.apellido;
    document.getElementById("edad").placeholder = perfil.edad;
    document.getElementById("exampleInputEmail1").placeholder = perfil.email;
    document.getElementById("tel").placeholder = perfil.tel;
    

}

function habilitarEdicion(){
    $('#editProfButton').on('click', function(e) {
        e.preventDefault();
        $('input').attr('disabled', false);
        $("#saveProfButton").show();
        $("#cancelProfButton").show();
        
    });
    
   
}

function desactivarCampos(){
    $('input').attr('disabled', true);
    $("#saveProfButton").hide();
    $("#cancelProfButton").hide();
}

function alerta(){
    $('#saveProfButton').on("click", function(){
        let valid = true;
        $('[required]').each(function() {
          if ($(this).is(':invalid') || !$(this).val()) valid = false;
        })
        if (!valid){
            alert("no olvide completar los campos obligatorios");
        }else{
            alert('¡Actualización de Perfil exitosa!');
            $('input').attr('disabled', true);
            guardarProf();
            location.reload();
        }
    }); 
} 

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    grillaInicial();
    habilitarEdicion();
    desactivarCampos();
    alerta();
});