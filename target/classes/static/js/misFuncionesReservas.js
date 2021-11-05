var idUpdate;

function autoInicioReservacion() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://129.151.114.57:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaReservation(respuesta);
        }

    })

}
function autoInicioRelacionCliente(){
    
    $.ajax({
        url:"http://129.151.114.57:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
          
            let $select = $("#select-client-r");
            let $selectU = $("#select-client-update");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
                $selectU.append('<option value='+name.idClient+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}
function autoInicioCostume(){

    $.ajax({
        url:"http://129.151.114.57:8080/api/Costume/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
            let $select = $("#select-costume-r");
            let $selectU = $("#select-costume-update");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                $selectU.append('<option value='+name.id+'>'+name.name+'</option>');
         
            }); 
        }
    
    })
}
//Manejador "POST"
function agregarReservation() {
    
    // if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
    //     alert("Todos los campos son Obligatorios")
    // }
    // else if(!validarFecha()){
    //     alert("Fecha de inicio debe ser menor a fecha final")
    // }
    // else{  
        let elemento = {
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            costume:{id: +$("#select-costume-r").val()},
            client:{idClient: +$("#select-client-r").val()},
            
        }

        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url:"http://129.151.114.57:8080/api/Reservation/save",
            //url: "http://localhost:8080/api/Reservation/save",
            data: dataToSend,
            datatype: "json",

            success: function (response) {
                console.log(response);
                //Limpiar Campos
                $("#resultado5").empty();
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");

                //Listar Tabla

                alert("Se ha guardado Correctamente!")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se guardo Correctamente!")
            }
        });
    // }
}

function pintarRespuestaReservation(respuesta){
   
    $("#idDivConsultaRes").empty();
    let myTable = "<table class='table table-hover'><thead>";
    // myTable += "<tr><th scope='col'>ID</th>";
    myTable += "<th scope='col'>Start Date</th>";
    myTable += "<th scope='col'>Devolution Date</th>";
    myTable += "<th scope='col'>STATUS</th>";
    myTable += "<th scope='col'>CLIENTE</th>";
    // myTable += "<th scope='col'>COSTUME</th>";
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
            myTable += "<td>" + respuesta[i].startDate + "</td>";
            myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
            myTable += "<td>" + respuesta[i].status + "</td>";
            myTable += "<td>" + respuesta[i].client.name + "</td>";
            // myTable += "<td>" + respuesta[i].costume.name + "</td>";

            myTable += "<td><button data-toggle='modal' data-target='#modalCostume_Update' class='btn btn-outline-success' onclick='consultarReservasid(" + respuesta[i].idReservation + ")'> Detalle</button></td>";
            myTable += "<td><button class='btn btn-outline-danger' onclick='borrarReservation(" + respuesta[i].idReservation + ")'>Delete</button></td>";
            myTable += "</tr></tbody>";
        }
    }

    myTable += "</table>";
    $("#idDivConsultaRes").append(myTable);
}
//Manejador DELETE
function borrarReservation(idElemento) {
    let elemento = {
        id: idElemento
    }

    let dataToSend = JSON.stringify(elemento);

    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://129.151.114.57:8080/api/Reservation/"+idElemento,
            //url: "http://localhost:8080/api/Reservation/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaReservation").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

function consultarReservasid(idElemento) {
    var id = idElemento;
    $.ajax(
        {
            url: 'http://129.151.114.57:8080/api/Reservation/' + id,
            type: 'GET',
            dataType: 'json',
            success: function (json) {

                // var category    =   json.category.name;    
                
                var idReservation = json.idReservation;
                idUpdate = idReservation;
                var startDate = json.startDate;
                var devolutionDate = json.devolutionDate;
                var status = json.status;

                
                $("#startDateUpdate").val(startDate);
                $("#devolutionDateUpdate").val(devolutionDate);
                $("#statusUpdate").val(status);
                
                console.log(json)
            },
            error: function (xhr, status) {
                alert('Operacion no satisfactoria,' + xhr.status);
            },
        }
    );
}
//Manejador PUT
function actualizarReservation() {
    
    // if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
    //     alert("Todos los campos deben estar llenos")
    // }else{
        let elemento = {
            idReservation: idUpdate,
            startDate: $("#startDateUpdate").val(),
            devolutionDate: $("#devolutionDateUpdate").val(),
            status: $("#statusUpdate").val(),
            costume:{id: +$("#select-costume-update").val()},
            client:{idClient: +$("#select-client-update").val()},
        }

        let dataToSend = JSON.stringify(elemento);
        console.log("-----------------------")
        console.log(dataToSend)
        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://129.151.114.57:8080/api/Reservation/update",
            //url: "http://localhost:8080/api/Reservation/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                alert("se ha Actualizado Correctamente!")
                //Limpiar Campos
                $("#idDivConsultaRes").empty();

                $("#startDateUpdate").val("");
                $("#devolutionDateUpdate").val("");
                $("#statusUpdate").val("");

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    // }
}

function validarFecha(){
    var fechaInicio = $("#startDate").val();
    var fechaFin = $("#devolutionDate").val();

    if(fechaInicio<=fechaFin){
        
        return 1;
        
    }
    else{
        
        return 0;
        
    }
}