# API-SUPERMARKET

Este proyecto consiste en realizar un CRUD mediante el uso de la plataforma de Google llamada Firebase que permite el desarrollo de aplicaciones web.

* **Firebase Hosting**, un servicio de hosting administrado para microservicios y contenido estático y dinámico
* **Firebase Authentication**, que autentica a los usuarios con sus direcciones de correo electrónico y contraseñas 
* **Firebase Firestore**, que es una base de datos NoSQL que permite almacenar, sincronizar y consultar datos para aplicaciones web

En este proyecto se desarrollaran los siguientes:

* Autentificación del usuario.
* Registrarse como nuevo usuario.
* CRUD de Producto.
* CRUD de la Compra realizada por el Usuarios.
* Lista de Pedidos de todos los Usuarios.

# Lenguaje

- **HTML**
- **JavaScript**

# Requisito previo para ejecutar el código.

1. Tener instalado **npm** y **nodejs** versión 22.
2. Para instalar nodejs puede acceder a la página official de nodejs y seguir los pasos de instalación.

<code>https://nodejs.org/en/download/package-manager</code>

# Firebase

## Crear un proyecto

Ingresar a la plataformaa desarrollada por Google <code>https://firebase.google.com/</code>

* Ingresar a la plataforma con una cuenta de **Google**.
* Ir a la **Go to console** desde la esquina superior derecha de la web.
* **Crear un proyecto**, ingresando el nombre de tu proyecto.
  ** Aceptar la condiciones  de Firebase y **Continuar**.
  ** Dejar deshabilitado **Google Analytics** para este proyecto.

## Configurar el proyecto

* Ingresar al proyecto creado.

* Ingresar en la opción de **Hosting**.
  ** Comenzar la creación del hosting y realice clic a siguiente hasta el final.

* Ingresar en la opción de **Authentication**.
  ** Comenzar la creación del authentication.
  ** Seleccionar un proveedor nativo como **Correo eléctronico/contraseña**.
  ** Habilitar **Correo eléctronico/contraseña** y guardar.

* Ingresar en la opción de **Firestore Database**.
  ** Crear una base de datos.
  ** Seleccionar una ubicación donde se almacenarán tus datos de Cloud Firestore.
  ** En regla de seguridad clickear en la opción de **Comenzar modo de prueba** y luego crear.

## Crear la Web

* En la descripcón general clickear en el icono **</>** denominado **web**.
  ** Registrar app ingrese un nombre para su app.
  
  
# Comando

- Para ejecutar este código deberá hacerlo por comando desde una terminal.
  
- Realizar desde dentro de la carpeta API-SUPERMARKET

* Instalar Firebase CLI
  
 1. Necesitas Firebase CLI (una herramienta de línea de comandos) para alojar tu sitio con Firebase Hosting.

  - Ejecuta el siguiente comando de npm para instalar la CLI o actualizar a su versión más reciente.

  $ npm install -g firebase-tools

 2. Abre una ventana de la terminal y navega a un directorio raíz para tu app web (si no tienes uno, deberás crearlo).

 - Acceder a Google

 $ firebase login

 - Inicia el proyecto seleccionando las opciones con la tecla espaciadora (Hosting, Firestore).
 
 $ firebase init

 3. Implementar en Firebase Hosting

 $ firebase deploy

# Configuración de proyecto

- En clickee la rueda que se encuentra a lado de la descripción general y entre en **Configuración del proyecto**.
- En General y ve a **Tus apps**, allí se encontrarán con la configuración SDK para su proyecto web, la cuál deben ser importado a su proyecto en desarrollo.

