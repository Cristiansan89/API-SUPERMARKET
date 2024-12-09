
const firebaseConfig = {
    apiKey: "AIzaSyAubh2_fIy1K9OR1-Km9rDcJQOFwOA_hbo",
    authDomain: "api-supermarket-3e2f5.firebaseapp.com",
    projectId: "api-supermarket-3e2f5",
    storageBucket: "api-supermarket-3e2f5.firebasestorage.app",
    messagingSenderId: "696038055718",
    appId: "1:696038055718:web:407ab7ae43630ce097abe7"
};

firebase.initializeApp(firebaseConfig);

// Initialize Firebase
var db = firebase.firestore();

function validacion(nombreProducto, descripcionProducto, stockProducto, precioProducto) {
    console.log('Entro a validar');
    if (nombreProducto = null || nombreProducto.length == 0 || /^\s+$/.test(nombreProducto)) {
        alert('[ERROR] El campo del nombre de producto debe tener un valor');
        return false;
    } else if (descripcionProducto = null || descripcionProducto.length == 0 || /^\s+$/.test(descripcionProducto)) {
        alert('[ERROR] El campo de la descripción de producto debe tener un valor');
        return false;
    } else if (stockProducto = null || stockProducto.length == 0 || /^\s+$/.test(stockProducto)) {
        alert('[ERROR] El campo de stock de producto debe tener un valor');
        return false;
    } else if (precioProducto = null || precioProducto.length == 0 || /^\s+$/.test(precioProducto)) {
        alert('[ERROR] El campo del precio de producto debe tener un valor');
        return false;
    } else {
        console.log('Validación ok');
        return true;
    }
}

function guardar() {
    var nombreProducto = document.getElementById('nombreProducto').value;
    var descripcionProducto = document.getElementById('descripcionProducto').value;
    var stockProducto = document.getElementById('stockProducto').value;
    var precioProducto = document.getElementById('precioProducto').value;

    if (validacion(nombreProducto, descripcionProducto, stockProducto, precioProducto)) {
        console.log('Entro en el if de validacion en guardar');
        db.collection("products").add({
            nombreProducto: nombreProducto,
            descripcionProducto: descripcionProducto,
            stockProducto: stockProducto,
            precioProducto: precioProducto
        }).then(
            function (docRef) {
                console.log('Escritura del documento con ID: ', docRef.id);
                document.getElementById('nombreProducto').value = '';
                document.getElementById('descripcionProducto').value = '';
                document.getElementById('stockProducto').value = '';
                document.getElementById('precioProducto').value = '';
                alert("Se registraron con éxito el producto");
            }
        ).catch(
            function (error) {
                console.error("Error añadiendo el documento: ", error);
            }
        )
    }
}

var tabla = document.getElementById('tabla');

db.collection("products").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombreProducto}`);

        tabla.innerHTML += `
            <tr>
                <th scope="row">${doc.data().nombreProducto}</th>
                <th scope="row">${doc.data().descripcionProducto}</th>
                <th scope="row">${doc.data().stockProducto}</th>
                <th scope="row">${doc.data().precioProducto}</th>
                 <td><button class="btn btn-danger" id="eliminarProducto" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning" id="editarProducto" onclick="editar('${doc.id}','${doc.data().nombreProducto}','${doc.data().descripcionProducto}','${doc.data().stockProducto}','${doc.data().precioProducto}')">Editar</button></td>
            </tr>
        `
    });
});

function eliminar(id) {
    db.collection("products").doc(id).delete().then(function () {
        console.log("Documentos eliminado satisfactoriamente!");
    }).catch(function (error) {
        console.error("Error al remover el documento: ", error);
    });
}

function editar(id, nombreProducto, descripcionProducto, stockProducto, precioProducto) {
    document.getElementById('nombreProducto').value = nombreProducto;
    document.getElementById('descripcionProducto').value = descripcionProducto;
    document.getElementById('stockProducto').value = stockProducto;
    document.getElementById('precioProducto').value = precioProducto;

    var editarProducto = document.getElementById('botonGuardar');
    editarProducto.innerHTML = 'Editar';
    editarProducto.onclick = function () {
        var saopauloRef = db.collection("products").doc(id);
        var nombreProducto = document.getElementById('nombreProducto').value;
        var descripcionProducto = document.getElementById('descripcionProducto').value;
        var stockProducto = document.getElementById('stockProducto').value;
        var precioProducto = document.getElementById('precioProducto').value;
        if (nombreProducto, descripcionProducto, stockProducto, precioProducto) {
            console.log('Entro al validad de editar');
            return saopauloRef.update({
                nombreProducto: nombreProducto,
                descripcionProducto: descripcionProducto,
                stockProducto: stockProducto,
                precioProducto: precioProducto
            }).then(
                function () {
                    console.log("Documento actualizado satisfactoriamente!");
                    document.getElementById('nombreProducto').value = '';
                    document.getElementById('descripcionProducto').value = '';
                    document.getElementById('stockProducto').value = '';
                    document.getElementById('precioProducto').value = '';
                    botonGuardar.innerHTML = 'Guardar';
                    alert("El producto se edito con exito");
                }
            ).catch({
                function(error) {
                    console.error("Error de actualización del documento: ", error);
                }
            });
        }
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
