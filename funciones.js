
var dbUser = localStorage.getItem("dbUser"); //Obtener datos de localStorage
var operacion = "A"; //"A"=agregar; "E"=edtidar
dbUser = JSON.parse(dbUser); // Covertir a objeto
if (dbUser === null) // Si no existe, creamos un array vacio.
    dbUser = [];


function Mensaje(t){
        switch (t) {
            case 1: //
                $("#mensaje-alerta").append(
                    "<div class='alert alert-success' role='alert'>Se agrego con exito el usuario</div>"
                );
                break;
            case 2: //
                $("#mensaje-alerta").append(
                    "<div class='alert alert-danger' role='alert'>Se elimino el usuario</div>"
                );
                break;
            default:
        }
    }


function AgregarUser () {
    // Seleccionamos los datos de los inputs de formulario
    var datos_cliente = JSON.stringify({
        Nombre : $("#nombre").val(),
        Correo : $("#correo").val(),
        Peso : $("#peso").val(),
        Fecha_nacimiento : $("#fecha_nacimiento").val(),
    });

    dbUser.push(datos_cliente); // Guardar datos en el array definido globalmente
    localStorage.setItem("dbUser", JSON.stringify(dbUser));



    ListarUser();


    return Mensaje(1);
}



function ListarUser (){
    $("#dbUser-list").html(
            "<thead>" +
                "<tr>" +
                    "<th> ID </th>" +

                    "<th> Nombre </th>" +
                    "<th> Correo </th>" +
                    "<th> Peso </th>" +
                    "<th> fecha_nacimiento </th>" +
                    "<th> </th>" +
                    "<th>  </th>" +
                "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
    );

    for (var i in dbUser) {
        var d = JSON.parse(dbUser[i]);
        $("#dbUser-list").append(
                        "<tr>" +
                            "<td>" + i + "</td>" +
                            "<td>" + d.Nombre + "</td>" +
                            "<td>" + d.Correo + "</td>" +
                            "<td>" + d.Peso + "</td>" +
                            "<td>" + d.Fecha_nacimiento + "</td>" +
                            "<td> <a id='"+ i +"' class='btnEditar' href='#'>Editar</a> </td>" +
                            "<td> <a id='" + i + "' class='btnEliminar' href='#'>Eliminar</a> </td>" +
                        "</tr>"
                           );
    }

}


if (dbUser.length !== 0) {
    ListarUser();
} else {
    $("#dbUser-list").append("<h2> No tienes Usuarios </h2>");
}

function contarUser(){
    var user = dbUser;
    nUser = user.length;

    $("#numeroUser").append(
        "<a>Tienes actualmente" + "<br>" + "<span class='badge'>" + nUser + "</span></a> Usuarios"
    );
    return nUser;
}

function Eliminar(e){
    dbUser.splice(e, 1); // Args (posición en el array, numero de items a eliminar)
    localStorage.setItem("dbUser", JSON.stringify(dbUser));
    ListarUser();
    return Mensaje(2);
}

function Editar() {
    dbUser[indice_selecionado] = JSON.stringify({
        Nombre : $("#nombre").val(),
        Correo : $("#correo").val(),
        Peso : $("#peso").val(),
        Fecha_nacimiento : $("#fecha_nacimiento").val(),
    });
    localStorage.setItem("dbUser", JSON.stringify(dbUser));
    operacion = "A"; //Regresamos la valor original
    return true;

}

$(".btnEliminar").bind("click", function(){
    alert("¿ Me quieres eliminar ?");
    indice_selecionado = $(this).attr("id"); // "this" contiene el elemento clikeado en el contexto actual
    console.log(indice_selecionado);
    console.log(this);
    Eliminar(indice_selecionado); // Eliminamos el elemento llamando la funcion de eliminar
    ListarUser();
});

$(".btnEditar").bind("click", function() {
    alert("¿ Me quieres editar ?");
    // Cambiamos el modo
    $(".modo").html("<span class='glyphicon glyphicon-pencil'> </span> Modo edición");
    operacion = "E";
    indice_selecionado = $(this).attr("id");
    console.log(indice_selecionado);
    console.log(this);
    // Llemanos el formulario con los datos actuales de la vaca a editar
    var userItem = JSON.parse(dbUser[indice_selecionado]);
    $("#nombre").val(userItem.Nombre);
    $("#correo").val(userItem.Correo);
    $("#peso").val(userItem.Peso);
    $("#fecha_nacimiento").val(userItem.Fecha_nacimiento);
    $("#nombre").focus();
});


contarUser();
// Esperar el evento de envio del formulario !!
$("#user-form").bind("submit", function() {
    debugger;
    if (operacion == "A")
        return AgregarUser();
    else {
        return Editar();
    }
});
