//Cargar de manera automatica los datos regostrados
// Busqueda por id
function findById(id) {
    $.ajax({
        url: 'http://localhost:9000/security/api/security/usersRoles/' + id,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (item) {
        $("#id").val(item.id)
        $("#roleId").val(item.roleId.id)
        $("#userId").val(item.userId.id)
        $("#status").val(item.status==true?'1':'0')      
    })
}

function loadTable() {
    $.ajax({
        url: 'http://localhost:9000/security/api/security/usersRoles',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (items) {
        var registros = "";
        items.forEach(function (item, index, array) {
            registros += `

                        <tr class="table-light">
                            <td>`+item.roleId.description+`</td>
                            <td>`+item.userId.user+`</td>
                            <td>`+(item.status==true?'Activo':'Inactivo')+`</td>
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
        url: 'http://localhost:9000/security/api/security/usersRoles/' + id,
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
        url: 'http://localhost:9000/security/api/security/usersRoles',
        data: JSON.stringify({
            roleId: {
                id:$("#roleId").val()
            },
            userId: {
                id:$("#userId").val()
            },  
            status: parseInt($("#status").val()),
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
        url: 'http://localhost:9000/security/api/security/usersRoles/' + $("#id").val(),
        data: JSON.stringify({
            roleId: {
                id:$("#roleId").val()
            },
            userId: {
                id:$("#userId").val()
            },  
            status: parseInt($("#status").val()),
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
    $("#roleId").val(""),
    $("#userId").val(""),
    $("#status").val("")
}