var flagName = 0, flagDescription = 0;

function traerInformacionCategorias() {
    console.log("test");
    $.ajax({
        url: "http://168.138.247.22:80/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta) {

    let myTable = "<table>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].description + "</td>";
        myTable += "<td> <button onclick=' actualizarInformacionCategorias(" + respuesta[i].id + ")'>Actualizar</button>";
        myTable += "<td> <button onclick='borrarCategoria(" + respuesta[i].id + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado1").html(myTable);
}

function guardarInformacionCategorias() {

    if ($("#Cname").val().length == 0 || $("#Cdescription").val().length == 0) {

        alert("Todos los campos son obligatorios");
    }
    else if (!flagName || !flagDescription) {
        alert("Verifique los campos")
    }
    else {

        let var2 = {
            name: $("#Cname").val(),
            description: $("#Cdescription").val()
        };

        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),

            url: "http://168.138.247.22:80/api/Category/save",


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

function actualizarInformacionCategorias(idElemento) {

    if ($("#Cname").val().length == 0 || $("#Cdescription").val().length == 0) {

        alert("Todos los campos son obligatorios");
    }
    else if (!flagName || !flagDescription) {
        alert("Verifique los campos")
    }
    else {


        let myData = {
            id: idElemento,
            name: $("#Cname").val(),
            description: $("#Cdescription").val()

        };
        console.log(myData);
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://168.138.247.22:80/api/Category/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuesta) {
                $("#resultado").empty();
                $("#id").val("");
                $("#Cname").val("");
                $("#Cdescription").val("");
                traerInformacionCategorias();
                alert("se ha Actualizado correctamente la categoria")
            }
        });
    }

}

function borrarCategoria(idElemento) {
    let myData = {
        id: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://168.138.247.22:80/api/Category/" + idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            traerInformacionCategorias();
            alert("Se ha Eliminado.")
        }
    });

}

function validadName() {
    var name = $("#Cname").val();

    if (name.length <= 45) {
        flagName = 1;
        $("#alertYearC").val("");
    } else {
        $("#alertYearC").val("Has superado el limite de caracteres");

        flagName = 0;
    }
}


function validadDescription() {
    var description = $("#Cdescription").val();

    if (description.length <= 250) {
        flagDescription = 1;
        $("#alertDescriptionC").val("");
    } else {
        $("#alertDescriptionC").val("Has superado el limite de caracteres");
        flagDescription = 0;
    }
}