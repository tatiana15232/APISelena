//Cargar de manera automatica los datos regostrados
// Busqueda por id
function findById(id) {
    $.ajax({
        url: 'http://localhost:9000/backend-service/api/security/user/' + id,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (item) {
        $("#id").val(item.id)
        $("#user").val(item.user)
        $("#password").val(item.password)
        $("#personId").val(item.personId.id)
        $("#state").val(item.state==true?'1':'0')         
    })
}

function loadTable() {
    $.ajax({
        url: 'http://localhost:9000/backend-service/api/security/user',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (items) {
        var registros = "";
        items.forEach(function (item, index, array) {
            registros += `
                        <tr class="table-light">
                            <td>`+item.user+`</td>
                            <td>`+item.password+`</td>
                            <td>`+item.personId.document+` - `+item.personId.firstName+` `+item.personId.firstLastName+`</td>
                            <td>`+(item.state==true?'Activo':'Inactivo')+`</td>
                            <td><img src="../../asset/library/node_modules/bootstrap-icons/icons/pencil-square.svg" alt="" onclick="findById(`+item.id+`);"></td>
                            <td><img src="../../asset/library/node_modules/bootstrap-icons/icons/person-x.svg" alt="" onclick="deleteById(`+item.id+`);"></td>
                        </tr>
                        `;
        })
        $("#dataResult").html(registros);   
    })
}

//Accion para eliminar un registro seleccionado 
function deleteById(id){
    $.ajax({
        url: 'http://localhost:9000/backend-service/api/security/user/' + id,
        method: "delete",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (result) {
        loadTable();
    })
}


//Accion de adicionar un registro
function Add(){
    $.ajax({
        url: 'http://localhost:9000/backend-service/api/security/user',
        data: JSON.stringify({
            user: $("#user").val(),
            password: $("#password").val(),
            personId: {
                id:parseInt($("#personId").val()),
            },
            state: parseInt($("#state").val()),
            userCreationId: 1,
            dateCreation: new Date()
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (result) {
        //Cargar datos
        loadTable();

        //Limpiar formulario
        clearData();
    })
}


//Accion de actualizar un registro
function Update(){
    $.ajax({
        url: 'http://localhost:9000/backend-service/api/security/user/' + $("#id").val(),
        data: JSON.stringify({
            user: $("#user").val(),
            password: $("#password").val(),
            personId: {
                id:parseInt($("#personId").val()),
            },
            state: parseInt($("#state").val()),
            userCreationId: 1,
            dateCreation: new Date(),
            userModificationId: 1,
            dateModification: new Date()
        }),
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (result) {
        //Cargar datos
        loadTable();

        //Limpiar formulario
        clearData();
    })
}

// Función para limpiar datos
function clearData(){
    $("#id").val(""),
    $("#user").val(""),
    $("#password").val(""),
    $("#personId").val(""),
    $("#state").val("")
}