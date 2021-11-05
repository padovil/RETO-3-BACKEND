/////////Tabla Cliente////////////////////////////

var flagEmail = 0, flagName = 0, flagAge = 0, flagPassword = 0;
var idUpdate;

function autoInicioCliente() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://129.151.114.57:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuesta2(respuesta);
        }

    })

}

function consultarClientId(idElemento) {
    var id = idElemento;
    $.ajax(
        {
            url: 'http://129.151.114.57:8080/api/Client/' + id,
            type: 'GET',
            dataType: 'json',
            success: function (json) {

                // var category    =   json.category.name;    
                
                var idClient = json.idClient;
                idUpdate = idClient;    
                var age = json.age;
                var name = json.name;
                var email = json.email;
                var password = json.password;

                // $("#category_update_costume").val(category);
                $("#name_update_client").val(name);
                $("#email_update_client").val(email);
                $("#password_update_client").val(password);
                $("#age_update_client").val(age);
                console.log(json)
            },
            error: function (xhr, status) {
                alert('Operacion no satisfactoria,' + xhr.status);
            },
        }
    );
}

function pintarRespuesta2(respuesta) {

    $("#idDivConsultaC").empty();
    let myTable = "<table class='table table-hover'><thead>";
    // myTable += "<tr><th scope='col'>ID</th>";
    myTable += "<th scope='col'>NAME</th>";
    myTable += "<th scope='col'>EMAIL</th>";
    myTable += "<th scope='col'>AGE</th>";
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
            myTable += "<td>" + respuesta[i].email + "</td>";
            myTable += "<td>" + respuesta[i].age + "</td>";
            


            myTable += "<td><button data-toggle='modal' data-target='#modalCostume_Update' class='btn btn-outline-success' onclick='consultarClientId(" + respuesta[i].idClient + ")'> Detalle</button></td>";
            myTable += "<td><button class='btn btn-outline-danger' onclick='borrarCliente(" + respuesta[i].idClient + ")'>Delete</button></td>";
            myTable += "</tr></tbody>";
        }
    }

    myTable += "</table>";
    $("#idDivConsultaC").append(myTable);
}

function guardarInformacionCliente() {

    // if ($("#Clemail").val().length == 0 || $("#Clpassword").val().length == 0 || $("#Clname").val().length == 0 || $("#Clage").val().length == 0) {

    //     alert("Todos los campos son obligatorios");
    // }

    // else if (!flagEmail || !flagName || !flagAge || !flagPassword) {
    //     alert("Verifique los campos")
    // }
    // else {
        let var2 = {

            email: $("#email_crear_client").val(),
            password: $("#password_crear_client").val(),
            name: $("#name_crear_client").val(),
            age: $("#age_crear_client").val(),

        };

        console.log(var2);
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),

            url: "http://129.151.114.57:8080/api/Client/save",


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

function actualizarInformacionCliente() {

    // if ($("#Clemail").val().length == 0 || $("#Clpassword").val().length == 0 || $("#Clname").val().length == 0 || $("#Clage").val().length == 0) {

    //     alert("Todos los campos son obligatorios");
    // }

    // else if (!flagEmail || !flagName || !flagAge || !flagPassword) {
    //     alert("Verifique los campos")
    // }
    // else {
        let myData = {
            idClient: idUpdate,
            email: $("#email_update_client").val(),
            password: $("#password_update_client").val(),
            name: $("#name_update_client").val(),
            age: $("#age_update_client").val(),
        };
        console.log(myData);
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://129.151.114.57:8080/api/Client/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuesta) {
                $("#idDivConsultaC").empty();
                $("#email_update_client").val("");
                $("#password_update_client").val("");
                $("#name_update_client").val("");
                $("#age_update_client").val("");
                
                autoInicioCliente();
                alert("se ha Actualizado correctamente Cliente")
            }
        });
    // }
}

function borrarCliente(idElemento) {
    let myData = {
        idClient: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url: "http://129.151.114.57:8080/api/Client/" + idElemento,
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
    // var name = $("#Clname").val();

    // if (name.length <= 250) {
    //     flagName = 1;
    //     $("#alertNameCl").val("");
    // } else {
    //     $("#alertNameCl").val("Has superado el limite de caracteres");

    //     flagName = 0;
    // }
}

function validadEmail() {
    // var email = $("#Clemail").val();

    // if (/^@/.test(email) && (/^.com/.test(email) || /^.edu/.test(email))) {
    //     flagEmail = 1;
    //     $("#alertEmail").val("");
    // } else {
    //     $("#alertEmail").val("Digita un correo válido");
    //     flagEmail = 0;
    // }
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



