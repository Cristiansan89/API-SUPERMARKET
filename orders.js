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

function listarPedidosGenerales() {
    db.collection("buys")
        .orderBy("fecha", "desc")
        .onSnapshot((querySnapshot) => {
            let tablaPedidos = document.getElementById('tablaPedidos');
            tablaPedidos.innerHTML = '';

            querySnapshot.forEach((doc) => {
                let pedido = doc.data();
                tablaPedidos.innerHTML += `
                    <tr>
                        <td>${pedido.userName}</td>
                        <td>${pedido.productoNombre}</td>
                        <td>${pedido.cantidad}</td>
                        <td>${pedido.precioTotal}</td>
                        <td>${new Date(pedido.fecha.seconds * 1000).toLocaleDateString()}</td>
                    </tr>
                `;
            });
        });
}

listarPedidosGenerales();

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