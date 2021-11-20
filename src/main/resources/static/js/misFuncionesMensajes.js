var idUpdate;
var MensajeC = 0, MensajeA=1;

function autoInicioRelacionCliente() {

    $.ajax({
        url: "http://129.151.114.57:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {

            let $select = $("#select-client-2");
            let $selectA = $("#select-client-A");
            $.each(respuesta, function (id, name) {
                $select.append('<option value=' + name.idClient + '>' + name.name + '</option>');
                $selectA.append('<option value=' + name.idClient + '>' + name.name + '</option>');
            });
        }

    })
}

function autoInicioCostume() {

    $.ajax({
        url: "http://129.151.114.57:8080/api/Costume/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {

            let $select = $("#select-costume-2");
            let $selectA = $("#select-costume-A");
            $.each(respuesta, function (id, name) {
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');
                $selectA.append('<option value=' + name.id + '>' + name.name + '</option>');

            });
        }

    })
}

function autoInicioMensajes() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://129.151.114.57:8080/api/Message/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaMensajes(respuesta);
        }

    })

}

function consultarMessageid(idElemento) {
    var id = idElemento;
    $.ajax(
        {
            url: 'http://129.151.114.57:8080/api/Message/' + id,
            type: 'GET',
            dataType: 'json',
            success: function (json) {

                // var category    =   json.category.name;    
                var idMessage = json.idMessage;
                idUpdate = idMessage;
                var messageText = json.messageText;
                
                $("#message_update").val(messageText);
                console.log(json)
            },
            error: function (xhr, status) {
                alert('Operacion no satisfactoria,' + xhr.status);
            },
        }
    );
}

function pintarRespuestaMensajes(respuesta) {

    $("#resultadoMensajes").empty();

    let myTable = "<table class='table table-hover'><thead>";
    // myTable += "<tr><th scope='col'>ID</th>";
    myTable += "<th scope='col'>MESSAGE</th>";
    myTable += "<th scope='col'>CLIENT</th>";
    myTable += "<th scope='col'>COSTUME</th>";
    
    myTable += "<th scope='col'>DETALLE</th>";
    myTable += "<th scope='col'>DELETE</th>";
    myTable += "</tr></thead>";
    if (respuesta.length < 1) {
        myTable += "<tbody><tr>";
        myTable += "<td scope='row'>" + "NO HAY ELEMENTOS" + "</td>";
    }
    else {
        for (i = 0; i < respuesta.length; i++) {

            myTable += "<tbody><tr>";
            // myTable += "<td scope='row'>" + respuesta[i].id + "</td>";
            myTable += "<td>" + respuesta[i].messageText + "</td>";
            myTable += "<td>" + respuesta[i].client.name + "</td>";
            myTable += "<td>" + respuesta[i].costume.name + "</td>";

            myTable += "<td><button data-toggle='modal' data-target='#modalCostume_Update' class='btn btn-outline-success' onclick='consultarMessageid(" + respuesta[i].idMessage + ")'> <img src='https://image.flaticon.com/icons/png/512/104/104668.png' width='20' height='20'> </button></td>";
            myTable += "<td><button class='btn btn-outline-danger' onclick='borrarMensaje(" + respuesta[i].idMessage + ")'><img src='https://cdn.icon-icons.com/icons2/868/PNG/128/trash_bin_icon-icons.com_67981.png' width='20' height='20'></button></td>";
            myTable += "</tr></tbody>";
        }
    }

    myTable += "</table>";
    $("#resultadoMensajes").html(myTable);
}

function guardarInformacionMensajes() {

    
   if (!MensajeC) {
        alert("Verifica los campos");
    }
    else {


        let var2 = {

            messageText: $("#message_crear").val(),
            costume: { id: +$("#select-costume-2").val() },
            client: { idClient: +$("#select-client-2").val() },


        };

        console.log(var2);
        $.ajax({
            type: 'POST',
            contentType: "application/json",
            dataType: 'JSON',
            data: JSON.stringify(var2),

            url: "http://129.151.114.57:8080/api/Message/save",


            success: function (response) {
                console.log(response);
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                window.location.reload()

            },

            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");


            }
        });
     }
}

function actualizarInformacionMensaje() {
    if (!MensajeA) {
        alert("Verifica los campos");
    }
    else {

        myData       = {
            idMessage          :   idUpdate,
            messageText :   $("#message_update").val(),
            // Client      :   {idClient: +$("#select-client-A").val() },
            // Costume     :   {id: +$("#select-costume-A").val() },

          
            
            
        };

  
        console.log(myData);
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://129.151.114.57:8080/api/Message/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuesta) {
                $("#resultado").empty();
                $("#messagetext").val("");

                autoInicioMensajes();
                alert("se ha Actualizado correctamente el Mensaje")
                window.location.reload()
            }
        });
     }
}

function borrarMensaje(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);

    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url: "http://129.151.114.57:8080/api/Message/" + idElemento,
            //url: "http://localhost:8080/api/Skate/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                // $("#miListaSkate").empty();
                autoInicioMensajes();
                alert("se ha Eliminado Correctamente!")
                location.reload(true);
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}





function validadMensajeCrear() {
    var name = $("#message_crear").val();
    console.log(name.length)
    if((name.length == 0) ){
        var elem = document.getElementById("message_crear");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");

        MensajeC = 0;
    }
    else if (name.length <= 250) {
        MensajeC = 1;
        var elem = document.getElementById("message_crear");
        elem.setAttribute
        elem.setAttribute("style", "border-color:rgb(0, 255, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(0, 255, 0);");
    } else {
        var elem = document.getElementById("message_crear");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");

        MensajeC = 0;
    }
}

function validadMensajeActualizar() {
    var name = $("#message_update").val();
    console.log(name.length)
    if((name.length == 0) ){
        var elem = document.getElementById("message_update");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");

        MensajeA = 0;
    }
    else if (name.length <= 250) {
        MensajeA = 1;
        var elem = document.getElementById("message_update");
        elem.setAttribute
        elem.setAttribute("style", "border-color:rgb(0, 255, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(0, 255, 0);");
    } else {
        var elem = document.getElementById("message_update");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");

        MensajeA = 0;
    }
}