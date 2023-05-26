function Login() {
    let user = document.getElementById('User').value;
    let password = document.getElementById('Password').value;

    //Datos de ingreso de la aplicación User: 1234 Pass: 1234
    if (user == '12345' && password == '12345') {
        Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            denyButtonText: `No continuar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                window.location.assign('Dashboard.html');
            } else if (result.isDenied) {
                Swal.fire('Se canceló el ingreso', '', 'info')
                Clear();
            }
        })

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error en la autenticación',
            text: 'Revisa que los datos ingresados son correctos',
        })
        Clear();
    }
}

function SignOut(){
    Swal.fire({
        title: '¡Hasta pronto!',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Cerrar Sesión',
        denyButtonText: `Continuar en la Sesión`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
            window.location.assign('Login.html');
        } else if (result.isDenied) {
            Swal.fire('Se continúa en la sesión', '', 'info')
            Clear();
        }
    })
}

function Clear() {
    document.getElementById('txtuser').value = '';
    document.getElementById('txtPassword').value = '';
}