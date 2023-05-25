//Cargar de manera automatica los datos regostrados
// Busqueda por id
function findById(id) {
    $.ajax({
        url: 'http://localhost:9000/security/api/security/persons/' + id,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (item) {
        $("#id").val(item.id)
        $("#documentType").val(item.documentType)
        $("#document").val(item.document)
        $("#firstName").val(item.firstName)
        $("#secondName").val(item.secondName)
        $("#firstLastName").val(item.firstLastName)
        $("#secondLastName").val(item.secondLastName)
        $("#age").val(item.age)
        $("#gender").val(item.gender)
        $("#mail").val(item.mail)
        $("#phoneNumber").val(item.phoneNumber)
        $("#address").val(item.address)
        $("#status").val(item.status==true?'1':'0')      
    })
}

function loadTable() {
    $.ajax({
        url: 'http://localhost:9000/security/api/security/persons',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (items) {
        var registros = "";
        items.forEach(function (item, index, array) {
            registros += `

                        <tr class="table-light">
                            <td>`+item.documentType+`</td>
                            <td>`+item.document+`</td>
                            <td>`+item.firstName+`</td>
                            <td>`+item.secondName+`</td>
                            <td>`+item.firstLastName+`</td>
                            <td>`+item.secondLastName+`</td>
                            <td>`+item.age+`</td>
                            <td>`+item.gender+`</td>
                            <td>`+item.mail+`</td>
                            <td>`+item.phoneNumber+`</td>
                            <td>`+item.address+`</td>
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
        url: 'http://localhost:9000/security/api/security/persons/' + id,
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
        url: 'http://localhost:9000/security/api/security/persons',
        data: JSON.stringify({
            documentType: $("#documentType").val(),
            document: $("#document").val(),
            firstName: $("#firstName").val(),
            secondName: $("#secondName").val(),
            firstLastName: $("#firstLastName").val(),
            secondLastName: $("#secondLastName").val(),
            age: $("#age").val(),
            gender: $("#gender").val(),
            mail: $("#mail").val(),
            phoneNumber: $("#phoneNumber").val(),
            address: $("#address").val(),
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
        url: 'http://localhost:9000/security/api/security/persons/' + $("#id").val(),
        data: JSON.stringify({
            documentType: $("#documentType").val(),
            document: $("#document").val(),
            firstName: $("#firstName").val(),
            secondName: $("#secondName").val(),
            firstLastName: $("#firstLastName").val(),
            secondLastName: $("#secondLastName").val(),
            age: $("#age").val(),
            gender: $("#gender").val(),
            mail: $("#mail").val(),
            phoneNumber: $("#phoneNumber").val(),
            address: $("#address").val(),
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
    $("#documentType").val(""),
    $("#document").val(""),
    $("#firstName").val(""),
    $("#secondName").val(""),
    $("#firstLastName").val(""),
    $("#secondLastName").val(""),
    $("#age").val(""),
    $("#gender").val(""),
    $("#mail").val(""),
    $("#phoneNumber").val(""),
    $("#address").val(""),
    $("#status").val("")
}