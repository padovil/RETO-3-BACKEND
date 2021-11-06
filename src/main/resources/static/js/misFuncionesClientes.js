/////////Tabla Cliente////////////////////////////
var idUpdate;
var passwordA = 0, passwordC = 0, ageA =0, ageC=0, emailA=0, emailC=0, nameA=0,nameC=0;

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
            


            myTable += "<td><button data-toggle='modal' data-target='#modalCostume_Update' class='btn btn-outline-success' onclick='consultarClientId(" + respuesta[i].idClient + ")'> <img src='https://image.flaticon.com/icons/png/512/104/104668.png' width='20' height='20'> </button></td>";
            myTable += "<td><button class='btn btn-outline-danger' onclick='borrarCliente(" + respuesta[i].idClient + ")'><img src='https://cdn.icon-icons.com/icons2/868/PNG/128/trash_bin_icon-icons.com_67981.png' width='20' height='20'></button></td>";
            myTable += "</tr></tbody>";
        }
    }

    myTable += "</table>";
    $("#idDivConsultaC").append(myTable);
}

function guardarInformacionCliente() {

    if (!passwordC || !ageC || !emailC || !nameC) {
         alert("Verifique los campos")
    }
     else {
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
     }
}

function actualizarInformacionCliente() {

    if (!passwordA || !ageA || !emailA || !nameA) {
        alert("Verifique los campos")
   }
     else {
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
                window.location.reload()
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


function validadEmailC() {
    var aux = $("#email_crear_client").val();
    console.log((aux.match(/[@]/) && (aux.match(/.com/) || /.edu/.test(aux))))
    if(aux.length == 0 ){
        var elem = document.getElementById("email_crear_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");
        emailC = 0;
    }
    else if ((aux.match(/[@]/) && (aux.match(/.com/) || /.edu/.test(aux)))) {
        emailC = 1;
        var elem = document.getElementById("email_crear_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color:rgb(0, 255, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(0, 255, 0);");
    } else {
        var elem = document.getElementById("email_crear_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");

        emailC = 0;
    }
}

function validadEmailA() {
    var aux = $("#email_update_client").val();
    console.log(aux.length)
    if(aux.length == 0  ){
        var elem = document.getElementById("email_update_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");
        emailA = 0;
    }
    else if ((aux.match(/[@]/) && (aux.match(/.com/) || /.edu/.test(aux)))) {
        emailA = 1;
        var elem = document.getElementById("email_update_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color:rgb(0, 255, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(0, 255, 0);");
    } else {
        var elem = document.getElementById("email_update_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");

        emailA = 0;
    }
}


function validadAgeC() {
    var age = $("#age_crear_client").val();
    console.log(age.length)
    if((age.length == 0) ){
        var elem = document.getElementById("age_crear_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");
        ageC = 0;
    }
    else if (age > 0 && age < 100) {
        ageC = 1;
        var elem = document.getElementById("age_crear_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color:rgb(0, 255, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(0, 255, 0);");
    } else {
        var elem = document.getElementById("age_crear_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");

        ageC = 0;
    }
}

function validadAgeA() {
    var age = $("#age_update_client").val();
    console.log(age.length)
    if((age.length == 0) ){
        var elem = document.getElementById("age_update_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");
        ageA = 0;
    }
    else if (age > 0 && age < 100) {
        ageA = 1;
        var elem = document.getElementById("age_update_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color:rgb(0, 255, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(0, 255, 0);");
    } else {
        var elem = document.getElementById("age_update_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");

        ageA = 0;
    }
}

function validadPasswordC() {
    var name = $("#password_crear_client").val();
    console.log(name.length)
    if((name.length == 0) ){
        var elem = document.getElementById("password_crear_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");
        passwordC = 0;
    }
    else if (name.length <= 45) {
        passwordC = 1;
        var elem = document.getElementById("password_crear_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color:rgb(0, 255, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(0, 255, 0);");
    } else {
        var elem = document.getElementById("password_crear_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");

        passwordC = 0;
    }
}

function validadPasswordA() {
    var aux = $("#password_update_client").val();
    console.log(aux.length)
    if((aux.length == 0) ){
        var elem = document.getElementById("password_update_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");
        passwordA = 0;
    }
    else if (aux.length <= 45) {
        passwordA = 1;
        var elem = document.getElementById("password_update_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color:rgb(0, 255, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(0, 255, 0);");
    } else {
        var elem = document.getElementById("password_update_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");

        passwordA = 0;
    }
}

function validadNameC() {
    var name = $("#name_crear_client").val();
    console.log(name.length)
    if((name.length == 0) ){
        var elem = document.getElementById("name_crear_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");
        nameC = 0;
    }
    else if (name.length <= 250) {
        nameC = 1;
        var elem = document.getElementById("name_crear_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color:rgb(0, 255, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(0, 255, 0);");
    } else {
        var elem = document.getElementById("name_crear_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");

        nameC = 0;
    }
}

function validadNameA() {
    var aux = $("#name_update_client").val();
    console.log(aux.length)
    if((aux.length == 0) ){
        var elem = document.getElementById("name_update_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");
        nameA = 0;
    }
    else if (aux.length <= 250) {
        nameA = 1;
        var elem = document.getElementById("name_update_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color:rgb(0, 255, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(0, 255, 0);");
    } else {
        var elem = document.getElementById("name_update_client");
        elem.setAttribute
        elem.setAttribute("style", "border-color: rgb(255, 0, 0);");
        elem.setAttribute("style", "box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgb(255,0,0);");

        nameA = 0;
    }
}
