var flagName = 0, flagDescription = 0;
var idUpdate;

function traerInformacionCategorias() {
    console.log("test");
    $.ajax({
        url: "http://129.151.114.57:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta) {


    $("#resultado1").empty();
    let myTable = "<table class='table table-hover'><thead>";
    // myTable += "<tr><th scope='col'>ID</th>";
    myTable += "<th scope='col'>NAME</th>";
    myTable += "<th scope='col'>DESCRIPTION</th>";
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
            myTable += "<td>" + respuesta[i].name + "</td>";
            myTable += "<td>" + respuesta[i].description + "</td>";


            myTable += "<td><button data-toggle='modal' data-target='#modalCostume_Update' class='btn btn-outline-success' onclick='consultarCategoryid(" + respuesta[i].id + ")'> Detalle</button></td>";
            myTable += "<td><button class='btn btn-outline-danger' onclick='borrarCategoria(" + respuesta[i].id + ")'>Delete</button></td>";
            myTable += "</tr></tbody>";
        }
    }

    myTable += "</table>";
    $("#resultado1").append(myTable);
}

function guardarInformacionCategorias() {

    // if ($("#Cname").val().length == 0 || $("#Cdescription").val().length == 0) {

    //     alert("Todos los campos son obligatorios");
    // }
    // else if (!flagName || !flagDescription) {
    //     alert("Verifique los campos")
    // }
    // else {

        let var2 = {
            name: $("#name_category_crear").val(),
            description: $("#des_category_crear").val()
        };

        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),

            url: "http://129.151.114.57:8080/api/Category/save",


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
    // }

}

function actualizarInformacionCategorias() {

    // if ($("#Cname").val().length == 0 || $("#Cdescription").val().length == 0) {

    //     alert("Todos los campos son obligatorios");
    // }
    // else if (!flagName || !flagDescription) {
    //     alert("Verifique los campos")
    // }
    // else {


        let myData = {
            id          :   idUpdate,
            name: $("#name_UD_costume").val(),
            description: $("#DES_UD_costume").val()

        };
        console.log(myData);
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://129.151.114.57:8080/api/Category/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuesta) {
                $("#resultado1").empty();
                $("#DES_UD_costume").val("");
                $("#name_UD_costume").val("");
                traerInformacionCategorias();
                alert("se ha Actualizado correctamente la categoria")
            }
        });
    // }

}

function consultarCategoryid(idElemento) {
    var id = idElemento;
    $.ajax(
        {
            url: 'http://129.151.114.57:8080/api/Category/' + id,
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                
                var id = json.id;
                idUpdate = id;
                var name = json.name;
                var description = json.description;

                
                $("#name_UD_costume").val(name);
                $("#DES_UD_costume").val(description);
                console.log(json)
            },
            error: function (xhr, status) {
                alert('Operacion no satisfactoria,' + xhr.status);
            },
        }
    );
}

function borrarCategoria(idElemento) {
    let myData = {
        id: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.114.57:8080/api/Category/" + idElemento,
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