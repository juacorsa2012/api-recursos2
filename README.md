# REST API de recursos

A continuación se detallan las características principales de la aplicación.

* Stack tecnológico usado: NodeJs + Express + MongoDB.
* La aplicación se estructura en capas (models, routes, controllers, utils y test).
* La configuración de la aplicación está definida en app.js.
* El servidor está definido en server.js
* Se han definido tantas modelos como entidades a gestionar. 
* Los modelos incluyen validaciones de mongoose y referencias entre los mismos.
* El modelo usuario incluye un hook "pre" para hashear la contraseña.
* Para evitar el try catch en los controladores se ha creado el middleware catchAsync.js (utils).
* La conexión con la base de datos está en el mongodb.connect.js (mongodb).
* Para usar las variables de entorno se usa dotenv.
* Se ha desarrollado un factory controller para agilizar los controladores CRUD.
* Los controladores se pueden proteger por autentificación y por roles (authcontroller.js).
* Existe un error.controller.js que controla los distintos tipos de error que se puedan dar.
* En la carpeta seed existen distintos ficheros para la importación de datos.
* La importación de temas, editoriales, fabricantes e idiomas tienen su fichero correspondiente.
* Para la imprtación de enlaces, libros y tutoriales existe seed.js, acepta 2 parámetros (entidad y números de docs a generar).
* Existen unas rutas para la obtención de datos agrupados (estadísticas) de enlaces, libros y tutoriales.
* Las estadísticas se definen sobre el mismo esquema como función estática.
* Se ha usado los paquetes helmet, xss-clean, hpp y express-mongo-sanitize para la seguridad.
* Se ha limitado el número de peticiones que pueden atenderse usando express-rate-limit.
* Se han desarrollado tests unitarios y de integración.
* Los tests están implementados en Jest.