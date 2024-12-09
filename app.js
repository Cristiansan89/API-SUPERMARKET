function registrar() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    console.log(email);
    console.log(password);
    firebase.auth().createUserWithEmailAndPassword(email, password).then(
        function () {
            verificar()
        }
    ).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    }); email - password.html
}

function ingresar() {
    var email = document.getElementById('email2').value;
    var password = document.getElementById('password2').value;

    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        console.log("Inicio de sesión exitoso.");
        // Redirigir a producto.html
        window.location.href = "producto.html";
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage); // Mostrar error al usuario
    }); email - password.html
}
function observador() {
    firebase.auth().onAuthStateChanged(
        function (user) {
            if (user) {
                // User is signed in.
                console.log('Existe usuario activo');
                aparece(user);
                var displayName = user.displayName;
                var email = user.email;
                console.log("ESTO ES PARA MOSTRAR LA VERIFICACION VIA MAIL");
                console.log(user.emailVerified);
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                // ...
            } else {
                // User is signed out.
                console.log("usuario NO Logueda");

                contenido.innerHTML = `   
                <div class = "container mt-5">   
                <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">Hola!</h4>
                <p>"Para acceder al contenido debe Registrarse"</p>
                </div>
                </div>
                `;
            }
        }
    ); email - password.html
}

function aparece(user) {
    //var contenido = document.getElementById('contenido');
    if (user.emailVerified) {
        location.href = "producto.html";
    }
}

function cerrar() {
    firebase.auth().signOut()
        .then(
            function () {
                console.log("Saliendo...");
                location.href = "index.html";
            }
        ).catch(function (error) {
            console.log(error);
        })
}

function verificar() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(
        function () {
            console.log("Enviando correo...");
            alert("Te hemos enviado un correo de activación");
            location.href = "index.html";
        }
    ).catch(function (error) {
        console.log(error);
    });
}

observador();