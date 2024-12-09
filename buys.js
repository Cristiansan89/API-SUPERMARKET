firebase.initializeApp({
    apiKey: "AIzaSyAubh2_fIy1K9OR1-Km9rDcJQOFwOA_hbo",
    authDomain: "api-supermarket-3e2f5.firebaseapp.com",
    projectId: "api-supermarket-3e2f5",
    storageBucket: "api-supermarket-3e2f5.firebasestorage.app",
    messagingSenderId: "696038055718",
    appId: "1:696038055718:web:407ab7ae43630ce097abe7"
});

// Referencia a Firestore
var db = firebase.firestore();

// Cargar los productos en el select al iniciar la página
window.onload = function () {
    cargarProductos();
    listarCompras();
};

// Función para cargar productos en el select
function cargarProductos() {
    var productoSelect = document.getElementById('productoSelect');
    db.collection("products").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let producto = doc.data();
            let option = document.createElement('option');
            option.value = doc.id;
            option.textContent = producto.nombreProducto;
            productoSelect.appendChild(option);
        });
    });
}

// Función para realizar una compra
function realizarCompra() {
    var productoId = document.getElementById('productoSelect').value;
    var cantidad = parseInt(document.getElementById('cantidadProducto').value);

    if (!productoId || isNaN(cantidad) || cantidad <= 0) {
        alert('[ERROR] Debes seleccionar un producto y una cantidad válida.');
        return;
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const userId = user.uid;
            const userName = user.displayName || user.email; // Usar el nombre si está disponible, de lo contrario el correo.

            // Obtener datos del producto
            db.collection("products").doc(productoId).get().then((doc) => {
                if (doc.exists) {
                    let producto = doc.data();

                    if (producto.stockProducto >= cantidad) {
                        // Reducir stock
                        db.collection("products").doc(productoId).update({
                            stockProducto: producto.stockProducto - cantidad
                        }).then(() => {
                            // Registrar la compra
                            db.collection("buys").add({
                                userId: userId,
                                userName: userName, // ID del usuario
                                productoId: productoId,
                                productoNombre: producto.nombreProducto,
                                cantidad: cantidad,
                                precioTotal: cantidad * producto.precioProducto,
                                fecha: new Date()
                            }).then(() => {
                                alert("Compra realizada con éxito.");
                                document.getElementById('productoSelect').value = '';
                                document.getElementById('cantidadProducto').value = '';
                            }).catch((error) => {
                                console.error("Error registrando la compra: ", error);
                            });
                        }).catch((error) => {
                            console.error("Error actualizando el stock: ", error);
                        });
                    } else {
                        alert('[ERROR] Stock insuficiente.');
                    }
                } else {
                    alert('[ERROR] Producto no encontrado.');
                }
            }).catch((error) => {
                console.error("Error obteniendo el producto: ", error);
            });
        } else {
            alert("Por favor, inicia sesión para realizar una compra.");
        }
    });
}

// Función para listar compras
function listarCompras() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const userId = user.uid;

            db.collection("buys")
                .where("userId", "==", userId) // Solo filtrar por userId
                .onSnapshot((querySnapshot) => {
                    let tablaCompras = document.getElementById('tablaCompras');
                    tablaCompras.innerHTML = '';
                    querySnapshot.forEach((doc) => {
                        let compra = doc.data();
                        tablaCompras.innerHTML += `
                        <tr>
                            <td>${compra.productoNombre}</td>
                            <td>${compra.cantidad}</td>
                            <td>${compra.precioTotal}</td>
                            <td>${new Date(compra.fecha.seconds * 1000).toLocaleDateString()}</td>
                            <td>
                                <button class="btn btn-warning btn-sm" onclick="editarCompra('${doc.id}', ${compra.cantidad}, '${compra.productoId}')">Editar</button>
                                <button class="btn btn-danger btn-sm" onclick="eliminarCompra('${doc.id}', ${compra.cantidad}, '${compra.productoId}')">Eliminar</button>
                            </td>
                        </tr>
                    `;
                    });
                });

        } else {
            alert("Por favor, inicia sesión para ver sus compras.");
            location.href = "index.html";
        }
    });
}

function editarCompra(idCompra, cantidadActual, productoId) {
    var nuevaCantidad = parseInt(prompt("Ingrese la nueva cantidad:", cantidadActual));

    if (isNaN(nuevaCantidad) || nuevaCantidad <= 0) {
        alert("La cantidad ingresada no es válida.");
        return;
    }

    // Obtener el producto asociado
    db.collection("products").doc(productoId).get().then((docProducto) => {
        if (docProducto.exists) {
            let producto = docProducto.data();
            let ajusteStock = cantidadActual - nuevaCantidad;

            // Actualizar el stock
            db.collection("products").doc(productoId).update({
                stockProducto: producto.stockProducto + ajusteStock
            }).then(() => {
                // Actualizar la compra
                db.collection("buys").doc(idCompra).update({
                    cantidad: nuevaCantidad,
                    precioTotal: nuevaCantidad * producto.precioProducto
                }).then(() => {
                    alert("La compra se actualizó correctamente.");
                }).catch((error) => {
                    console.error("Error actualizando la compra: ", error);
                });
            }).catch((error) => {
                console.error("Error actualizando el stock del producto: ", error);
            });
        }
    }).catch((error) => {
        console.error("Error obteniendo el producto: ", error);
    });
}

function eliminarCompra(idCompra, cantidad, productoId) {
    if (!confirm("¿Estás seguro de que deseas eliminar esta compra?")) return;

    // Obtener el producto asociado
    db.collection("products").doc(productoId).get().then((docProducto) => {
        if (docProducto.exists) {
            let producto = docProducto.data();

            // Restaurar el stock
            db.collection("products").doc(productoId).update({
                stockProducto: producto.stockProducto + cantidad
            }).then(() => {
                // Eliminar la compra
                db.collection("buys").doc(idCompra).delete().then(() => {
                    alert("La compra se eliminó correctamente.");
                }).catch((error) => {
                    console.error("Error eliminando la compra: ", error);
                });
            }).catch((error) => {
                console.error("Error actualizando el stock del producto: ", error);
            });
        }
    }).catch((error) => {
        console.error("Error obteniendo el producto: ", error);
    });
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
