var nameA=0,descriptionA=0;
var nameC=0,descriptionC=0;
var idUpdate;

var emerge6 = null;


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


            myTable += "<td><button data-toggle='modal' data-target='#modalCostume_Update' class='btn btn-outline-success' onclick='consultarCategoryid(" + respuesta[i].id + ")'> <img src='https://image.flaticon.com/icons/png/512/104/104668.png' width='20' height='20'> </button></td>";
            myTable += "<td><button class='btn btn-outline-danger' onclick='borrarCategoria(" + respuesta[i].id + ")'><img src='https://cdn.icon-icons.com/icons2/868/PNG/128/trash_bin_icon-icons.com_67981.png' width='20' height='20'></button></td>";
            myTable += "</tr></tbody>";
        }
    }

    myTable += "</table>";
    $("#resultado1").append(myTable);
}

function guardarInformacionCategorias() {
    
    if( !nameC || !descriptionC){
       alert("Verifique los campos")
   }
   else{

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
    }

}

function actualizarInformacionCategorias() {

    if( !nameA || !descriptionA){
        alert("Verifique los campos")
    }
    else {


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
                window.location.reload()
            }
        });
    }

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
            window.location.reload()
        }
    });

}

function validadNameCrear() {
    var name = $("#name_category_crear").val();
    console.log(name.length)
    if((name.length == 0) ){
        var elem = document.getElementById("name_category_crear");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");

        nameC = 0;
    }
    else if (name.length <= 45) {
        nameC = 1;
        var elem = document.getElementById("name_category_crear");
        elem.setAttribute
        elem.setAttribute("style", "border-color:rgb(0, 255, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(0, 255, 0);");
    } else {
        var elem = document.getElementById("name_category_crear");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");

        nameC = 0;
    }
}

function validadNameActualizar() {
    var name = $("#name_UD_costume").val();
    console.log(name.length)
    if((name.length == 0) ){
        var elem = document.getElementById("name_UD_costume");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");

        nameA = 0;
    }
    else if (name.length <= 45) {
        nameA = 1;
        var elem = document.getElementById("name_UD_costume");
        elem.setAttribute
        elem.setAttribute("style", "border-color:rgb(0, 255, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(0, 255, 0);");
    } else {
        var elem = document.getElementById("name_UD_costume");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");

        nameA = 0;
    }
}


function validadDescriptionCrear() {
    var name = $("#des_category_crear").val();
    console.log(name.length)
    if((name.length == 0) ){
        var elem = document.getElementById("des_category_crear");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");
{/* <abbr title="TEXTO EMERGENTE QUE SE MOSTRARÁ AL PASAR EL CURSOR">Texto a explicar</abbr> */}
        descriptionC = 0;
    }
    else if (name.length <= 250) {
        descriptionC = 1;
        var elem = document.getElementById("des_category_crear");
        elem.setAttribute
        elem.setAttribute("style", "border-color:rgb(0, 255, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(0, 255, 0);");
    } else {
        var elem = document.getElementById("des_category_crear");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");

        descriptionC = 0;
    }
}

function validadDescriptionActualizar() {
    var name = $("#DES_UD_costume").val();
    console.log(name.length)
    if((name.length == 0) ){
        var elem = document.getElementById("DES_UD_costume");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");

        descriptionA = 0;
    }
    else if (name.length <= 250) {
        descriptionA = 1;
        var elem = document.getElementById("DES_UD_costume");
        elem.setAttribute
        elem.setAttribute("style", "border-color:rgb(0, 255, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(0, 255, 0);");
    } else {
        var elem = document.getElementById("DES_UD_costume");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");

        descriptionA = 0;
    }
}


