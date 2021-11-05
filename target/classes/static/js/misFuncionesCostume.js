var flagName = 0, flagbrand = 0, flagYear = 0, flagDescription = 0;
var idUpdate;
var idNameBuscar;

function autoInicioCategoria() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://129.151.114.57:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            let $select = $("#select-category");
            let $select1 = $("#select-category-1");
            $.each(respuesta, function (id, name) {
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');
                console.log("select " + name.id);

                $select1.append('<option value=' + name.id + '>' + name.name + '</option>');
                console.log("select " + name.id);
            });
        }

    })
}

function autoInicioCostume() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://129.151.114.57:8080/api/Costume/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaSkate(respuesta);
        }
    })
}

function consultarCostumeid(idElemento) {
    var id = idElemento;
    $.ajax(
        {
            url: 'http://129.151.114.57:8080/api/Costume/' + id,
            type: 'GET',
            dataType: 'json',
            success: function (json) {

                // var category    =   json.category.name;    
                
                var id = json.id;
                idUpdate = id;
                var brand = json.brand;
                var year = json.year;
                var name = json.name;
                var description = json.description;

                // $("#category_update_costume").val(category);
                $("#id_update_costume").val(id);
                $("#brand_update_costume").val(brand);
                $("#year_update_costume").val(year);
                $("#name_update_costume").val(name);
                $("#description_update_costume").val(description);
                console.log(json)
            },
            error: function (xhr, status) {
                alert('Operacion no satisfactoria,' + xhr.status);
            },
        }
    );
}


function agregarElementos() {
    // if ($("#name2").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#description2").val().length == 0) {
    //     alert("Todos los campos son obligatorios")
    // }
    // else {
        let myData = {
            // id: $("#id_crear_costume").val(),
            name: $("#name_crear_costume").val(),
            brand: $("#brand_crear_costume").val(),
            year: $("#year_crear_costume").val(),
            description: $("#description_crear_costume").val(),
            category: { id: +$("#select-category").val() },
            
        };

        let dataToSend = JSON.stringify(myData);
        console.log(myData);
        
        $.ajax(
            {
                url: 'http://129.151.114.57:8080/api/Costume/save',
                type: 'POST',
                data: dataToSend,
                dataType: 'json',
                contentType: 'application/json',

                success: function (response) {
                    console.log(response);
                    alert("Se ha Agregado satisfactoriamente");
                    $("#id_crear_costume").val("");
                    $("#brand_crear_costume").val("");
                    $("#year_crear_costume").val("");
                    $("#description_crear_costume").val("");
                    $("#category_crear_costume").val("");
                    $("#name_crear_costume").val("");

                    autoInicioCostume();
                    location.reload(true);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            }
        );
    // }
}

function pintarRespuestaSkate(respuesta) {

    $("#idDivConsulta").empty();
    let myTable = "<table class='table table-hover'><thead>";
    // myTable += "<tr><th scope='col'>ID</th>";
    myTable += "<th scope='col'>NAME</th>";
    myTable += "<th scope='col'>BRAND</th>";
    myTable += "<th scope='col'>YEAR</th>";
    myTable += "<th scope='col'>DESCRIPTION</th>";
    myTable += "<th scope='col'>CATEGORY</th>";
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
            myTable += "<td>" + respuesta[i].brand + "</td>";
            myTable += "<td>" + respuesta[i].year + "</td>";
            myTable += "<td>" + respuesta[i].description + "</td>";

            myTable+="<td>" + respuesta[i].category.name + "</td>";



            myTable += "<td><button data-toggle='modal' data-target='#modalCostume_Update' class='btn btn-outline-success' onclick='consultarCostumeid(" + respuesta[i].id + ")'> Detalle</button></td>";
            myTable += "<td><button class='btn btn-outline-danger' onclick='borrar(" + respuesta[i].id + ")'>Delete</button></td>";
            myTable += "</tr></tbody>";
        }
    }

    myTable += "</table>";
    $("#idDivConsulta").append(myTable);
}

//Manejador DELETE
function borrar(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);

    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url: "http://129.151.114.57:8080/api/Costume/" + idElemento,
            //url: "http://localhost:8080/api/Skate/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                // $("#miListaSkate").empty();
                autoInicioCostume();
                alert("se ha Eliminado Correctamente!")
                location.reload(true);
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}


//Manejador PUT
function actualizar() {

    myData       = {
        id          :   idUpdate,
        name        :   $("#name_update_costume").val(),
        brand       :   $("#brand_update_costume").val(),
        year        :   $("#year_update_costume").val(),
        description :   $("#description_update_costume").val(),
        category    :   { id: +$("#select-category-1").val() },
        
    };
   
   
    console.log(myData);
    let dataToSend = JSON.stringify(myData);

    $.ajax (
                {

                    datatype: 'json',
                    data: dataToSend,
                    contentType: "application/JSON",
                    url: "http://129.151.114.57:8080/api/Costume/update",
                    //url: "http://localhost:8080/api/Skate/update",
                    type: "PUT",

                    success      :  function(response){
                                        console.log(response);
                                        alert("Se ha actualizado satisfactoriamente");
                                        autoInicioCostume();
                                        location.reload(true);
                                    },
                    error       :   function(xhr,status){
                                        console.log( xhr);
                                        alert("No se Actualizo Correctamente!")
                                    }

                }
            );



}

function validadName() {
    var name = $("#name2").val();

    if (name.length <= 45) {
        flagName = 1;
        $("#alertName").val("");
    } else {
        $("#alertName").val("Has superado el limite de caracteres");

        flagName = 0;
    }
}

function validadBrand() {
    var brand = $("#brand").val();

    if (brand.length <= 45) {
        flagBrand = 1;
        $("#alertBrand").val("");
    } else {
        $("#alertBrand").val("Has superado el limite de caracteres");

        flagBrand = 0;
    }
}

function validadYear() {
    var year = $("#year").val();

    if (year.length == 4) {
        flagYear = 1;
        $("#alertYear").val("");
    } else {
        $("#alertYear").val("Por favor digita un año válido");
        flagYear = 0;
    }
}

function validarDescription() {
    var description = $("#description2").val();

    if (description.length <= 250) {
        flagBrand = 1;
        $("#alertDescription").val("");
    } else {
        $("#alertDescription").val("Has superado el limite de caracteres");

        flagBrand = 0;
    }
}