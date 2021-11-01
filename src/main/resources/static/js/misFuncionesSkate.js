var flagName = 0, flagbrand = 0, flagYear = 0, flagDescription = 0;

function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://168.138.247.22:80/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}

function agregarSkate() {

    if($("#name2").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#description2").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else if(!flagName || !flagDescription || !flagYear || !flagbrand){
        alert("Verifique los campos")
    }
    else{

            let elemento = {
                name: $("#name2").val(),
                brand: $("#brand").val(),
                year: $("#year").val(),
                description: $("#description2").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://168.138.247.22:80/api/Skate/save",
                //url: "http://localhost:8080/api/Skate/save",
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                    //Limpiar Campos
                    $("#resultado2").empty();
                    $("#name2").val("");
                    $("#brand").val("");
                    $("#year").val("");
                    $("#description2").val("");
                    

                    //Listar Tabla

                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    }
}

//Manejador GET
function traerInformacionSkate() {
    $.ajax({
        url:"http://168.138.247.22:80/api/Skate/all",
        //url: "http://localhost:8080/api/Skate/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaSkate(response);
        }

    });

}

function pintarRespuestaSkate(response){

    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Modelo</td>";
        myTable+="<td>Año</td>";
        myTable+="<td>Descripcion</td>";
        myTable+="<td>Categoria</td>";
    "</tr>";

    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].brand + "</td>";
        myTable+="<td>" + response[i].year + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + response[i].category.name + "</td>";
        myTable+='<td><button class = "botonSkate2" onclick="borrar(' + response[i].id + ')">Borrar Skate!</button></td>';
        myTable+='<td><button class = "botonSkate2" onclick="cargarDatosSkate(' + response[i].id + ')">Editar Skate!</button></td>';
        myTable+='<td><button class = "botonSkate2" onclick="actualizar(' + response[i].id + ')">Actualizar Skate!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaSkate").html(myTable);
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
            url:"http://168.138.247.22:80/api/Skate/"+idElemento,
            //url: "http://localhost:8080/api/Skate/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaSkate").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Capturar informacion para Actualizar
function cargarDatosSkate(id) {
    $.ajax({
        dataType: 'json',
        url:"http://168.138.247.22:80/api/Skate/"+id,
        //url: "http://localhost:8080/api/Skate/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#name2").val(item.name);
            $("#brand").val(item.brand);
            $("#year").val(item.year);
            $("#description2").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

//Manejador PUT
function actualizar(idElemento) {
    
    if($("#name2").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#description2").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }
    else if(!flagName || !flagDescription || !flagYear || !flagbrand){
        alert("Verifique los campos")
    }
    else{
        let elemento = {
            id: idElemento,
            name: $("#name2").val(),
            brand: $("#brand").val(),
            year: $("#year").val(),
            description: $("#description2").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://168.138.247.22:80/api/Skate/update",
            //url: "http://localhost:8080/api/Skate/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaSkate").empty();
                listarSkate();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado2").empty();
                $("#id").val("");
                $("#name2").val("");
                $("#brand").val("");
                $("#year").val("");
                $("#description2").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}

function validadName(){
    var name = $("#name2").val();

    if(name.length <= 45){
        flagName = 1;
        $("#alertName").val("");
    }else{
        $("#alertName").val("Has superado el limite de caracteres");
        
        flagName = 0;
    }
}

function validadBrand(){
    var brand = $("#brand").val();

    if(brand.length <= 45){
        flagBrand = 1;
        $("#alertBrand").val("");
    }else{
        $("#alertBrand").val("Has superado el limite de caracteres");
        
        flagBrand = 0;
    }
}

function validadYear(){
    var year = $("#year").val();

    if(year.length == 4){
        flagYear = 1;
        $("#alertYear").val("");
    }else{
        $("#alertYear").val("Por favor digita un año válido");        
        flagYear = 0;
    }
}

function validarDescription(){
    var description = $("#description2").val();

    if(description.length <= 250){
        flagBrand = 1;
        $("#alertDescription").val("");
    }else{
        $("#alertDescription").val("Has superado el limite de caracteres");
        
        flagBrand = 0;
    }
}