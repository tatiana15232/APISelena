//Cargar de manera automatica los datos regostrados
// Busqueda por id
function findById(id) {
    $.ajax({
        url: 'http://localhost:9000/security/api/security/views/' + id,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (item) {
        $("#id").val(item.id)
        $("#route").val(item.route)
        $("#label").val(item.label)
        $("#moduleId").val(item.moduleId.id)
        $("#status").val(item.status==true?'1':'0')      
    })
}

function loadTable() {
    $.ajax({
        url: 'http://localhost:9000/security/api/security/views',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (items) {
        var registros = "";
        items.forEach(function (item, index, array) {
            registros += `

                        <tr class="table-light">
                            <td>`+item.route+`</td>
                            <td>`+item.label+`</td>
                            <td>`+item.moduleId.description+`</td>
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
        url: 'http://localhost:9000/security/api/security/views/' + id,
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
        url: 'http://localhost:9000/security/api/security/views',
        data: JSON.stringify({
            route: $("#route").val(),
            label: $("#label").val(),
            moduleId: {
                id:$("#moduleId").val()
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
        url: 'http://localhost:9000/security/api/security/views/' + $("#id").val(),
        data: JSON.stringify({
            route: $("#route").val(),
            label: $("#label").val(),
            moduleId: {
                id:$("#moduleId").val()
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
    $("#route").val(""),
    $("#label").val(""),
    $("#moduleId").val(""),
    $("#status").val("")
}