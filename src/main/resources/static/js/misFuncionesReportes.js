function traerReporteStatus() {
    console.log("test");
    $.ajax({
        url: "http://129.151.114.57:8080/api/Reservation/report-status",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}
function pintarRespuesta(respuesta) {

    $("#resultadoStatus").empty();
    let myTable = "<table class='table table-hover'><thead>";
    // myTable += "<tr><th scope='col'>ID</th>";
    myTable += "<th scope='col' style='text-align: center;'>COMPLETED</th>";
    myTable += "<th scope='col' style='text-align: center;'>CANCELLED</th>";
    myTable += "</tr></thead>";
    if (respuesta.length < 1) {
        myTable += "<tbody><tr>";
        myTable += "<td scope='row'>" + "NO HAY RESERVAS" + "</td>";
    }
    else {


        myTable += "<tbody><tr>";
        // myTable += "<td scope='row'>" + respuesta[i].id + "</td>";
        myTable += "<td style='text-align: center; background-color: #ABF3AA; font-size:20px; font-weight:bold'>" + respuesta.completed + "</td>";
        myTable += "<td style='text-align: center; background-color: #F3AAAA; font-size:20px; font-weight:bold'>" + respuesta.cancelled + "</td>";
        myTable += "</tr></tbody>";

    }

    myTable += "</table>";
    $("#resultadoStatus").append(myTable);

}


function traerReporteDate() {

    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);

    $.ajax({
        url: "http://129.151.114.57:8080/api/Reservation/report-dates/" + fechaInicio + "/" + fechaCierre,
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaDate(respuesta);
        }
    });
}
function pintarRespuestaDate(respuesta) {

   


    $("#resultadoDate").empty();
    let myTable = "<table class='table table-hover'><thead>";
    // myTable += "<tr><th scope='col'>ID</th>";
    myTable += "<th scope='col'>START DATE</th>";
    myTable += "<th scope='col'>DEVOLUTION DATE</th>";
    myTable += "<th scope='col'>STATUS</th>";
    myTable += "</tr></thead>";
    if (respuesta.length < 1) {
        myTable += "<tbody><tr>";
        myTable += "<td scope='row'>" + "NO HAY ELEMENTOS" + "</td>";
    }
    else {
        for (i = 0; i < respuesta.length; i++) {

            myTable += "<tbody><tr>";
            // myTable += "<td scope='row'>" + respuesta[i].id + "</td>";
            myTable += "<td>" + respuesta[i].startDate + "</td>";
            myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
            myTable += "<td>" + respuesta[i].status + "</td>";
        }
    }

    myTable += "</table>";
    $("#resultadoDate").append(myTable);
}




function traerReporteClientes() {
    $.ajax({
        url: "http://129.151.114.57:8080/api/Reservation/report-clients",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    });
}
function pintarRespuestaClientes(respuesta) {

    $("#resultadoClientes").empty();
    let myTable = "<table class='table table-hover'><thead>";
    // myTable += "<tr><th scope='col'>ID</th>";
    myTable += "<th scope='col'>NAME</th>";
    myTable += "<th scope='col'>EMAIL</th>";
    myTable += "<th scope='col'>AGE</th>";
    myTable += "<th scope='col'>TOTAL</th>";
    
    myTable += "</tr></thead>";
    if (respuesta.length < 1) {
        myTable += "<tbody><tr>";
        myTable += "<td scope='row'>" + "NO HAY ELEMENTOS" + "</td>";
    }
    else {
        for (i = 0; i < respuesta.length; i++) {

            myTable += "<tbody><tr>";
            // myTable += "<td scope='row'>" + respuesta[i].id + "</td>";
            myTable += "<td>" + respuesta[i].client.name + "</td>";
            myTable += "<td>" + respuesta[i].client.email + "</td>";
            myTable += "<td>" + respuesta[i].client.age + "</td>";
            myTable += "<td>" + respuesta[i].total + "</td>";

           
            myTable += "</tr></tbody>";
        }
    }

    myTable += "</table>";
    $("#resultadoClientes").append(myTable);
}
