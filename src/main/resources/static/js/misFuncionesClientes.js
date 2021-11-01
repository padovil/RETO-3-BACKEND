/////////Tabla Cliente////////////////////////////

var flagEmail = 0, flagName = 0, flagAge = 0, flagPassword = 0;

function autoInicioCliente() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://168.138.247.22:80/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuesta2(respuesta);
        }

    })

}
function pintarRespuesta2(respuesta) {

    let myTable = "<table>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";

        myTable += "<td>" + respuesta[i].email + "</td>";
        myTable += "<td>" + respuesta[i].password + "</td>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].age + "</td>";
        myTable += "<td> <button onclick=' actualizarInformacionCliente(" + respuesta[i].idClient + ")'>Actualizar</button>";
        myTable += "<td> <button onclick='borrarCliente(" + respuesta[i].idClient + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado3").html(myTable);
}

function guardarInformacionCliente() {

    if ($("#Clemail").val().length == 0 || $("#Clpassword").val().length == 0 || $("#Clname").val().length == 0 || $("#Clage").val().length == 0) {

        alert("Todos los campos son obligatorios");
    }

    else if (!flagEmail || !flagName || !flagAge || !flagPassword) {
        alert("Verifique los campos")
    }
    else {
        let var2 = {

            email: $("#Clemail").val(),
            password: $("#Clpassword").val(),
            name: $("#Clname").val(),
            age: $("#Clage").val(),

        };

        console.log(var2);
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),

            url: "http://168.138.247.22:80/api/Client/save",


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

function actualizarInformacionCliente(idElemento) {

    if ($("#Clemail").val().length == 0 || $("#Clpassword").val().length == 0 || $("#Clname").val().length == 0 || $("#Clage").val().length == 0) {

        alert("Todos los campos son obligatorios");
    }

    else if (!flagEmail || !flagName || !flagAge || !flagPassword) {
        alert("Verifique los campos")
    }
    else {
        let myData = {
            idClient: idElemento,
            email: $("#Clemail").val(),
            password: $("#Clpassword").val(),
            name: $("#Clname").val(),
            age: $("#Clage").val(),


        };
        console.log(myData);
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://168.138.247.22:80/api/Client/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuesta) {
                $("#resultado").empty();
                $("#idClient").val("");
                $("#Clemail").val("");
                $("#Clpassword").val("");
                $("#Clname").val("");
                $("#Clage").val("");
                autoInicioCliente();
                alert("se ha Actualizado correctamente Cliente")
            }
        });
    }
}

function borrarCliente(idElemento) {
    let myData = {
        idClient: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url: "http://168.138.247.22:80/api/Client/" + idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            autoInicioCliente();
            alert("Se ha Eliminado.")
        }
    });

}


function validadName() {
    var name = $("#Clname").val();

    if (name.length <= 250) {
        flagName = 1;
        $("#alertNameCl").val("");
    } else {
        $("#alertNameCl").val("Has superado el limite de caracteres");

        flagName = 0;
    }
}

function validadEmail() {
    var email = $("#Clemail").val();

    if (/^@/.test(email) && (/^.com/.test(email) || /^.edu/.test(email))) {
        flagEmail = 1;
        $("#alertEmail").val("");
    } else {
        $("#alertEmail").val("Digita un correo válido");
        flagEmail = 0;
    }
}


function validadAge() {
    var age = $("#Clage").val();

    if (age > 1 && age < 100) {
        flagAge = 1;
        $("#alertAge").val("");
    } else {
        $("#alertAge").val("Digita una edad válida");
        flagAge = 0;
    }
}

function validadPassword() {
    var password = $("#Clpassword").val();

    if (password.length <= 45) {
        flagPassword = 1;
        $("#alertPassword").val("");
    } else {
        $("#alertPassword").val("Has superado el limite de caracteres");
        flagPassword = 0;
    }
}



