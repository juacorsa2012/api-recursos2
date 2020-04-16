const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const hpp = require('hpp')
const ApplicationError = require('./utils/applicationError');
const ErrorHandler = require('./controllers/error.controller');
const temaRoutes = require('./routes/tema.routes');
const idiomaRoutes = require('./routes/idioma.routes');
const fabricanteRoutes = require('./routes/fabricante.routes');
const editorialRoutes = require('./routes/editorial.routes');
const enlacesRoutes = require('./routes/enlace.routes');
const libroRoutes = require('./routes/libro.routes');
const tutorialRoutes = require('./routes/tutorial.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const estadisticaRoutes = require('./routes/estadistica.routes');
const db = require("./mongodb/mongodb.connect");

const app = express();

db.connect();
app.use(express.json());
app.use(cors());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Demasiadas peticiones desde esta IP.'
})

// Seguridad
app.use('/api/v1/', limiter)
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

// Rutas
app.use('/api/v1/temas', temaRoutes);
app.use('/api/v1/idiomas', idiomaRoutes);
app.use('/api/v1/editoriales', editorialRoutes);
app.use('/api/v1/fabricantes', fabricanteRoutes);
app.use('/api/v1/enlaces', enlacesRoutes);
app.use('/api/v1/libros', libroRoutes);
app.use('/api/v1/tutoriales', tutorialRoutes);
app.use('/api/v1/usuarios', usuarioRoutes);
app.use('/api/v1/estadisticas', estadisticaRoutes);

app.all('*', (req, res, next) => {
  next(new ApplicationError(`No se ha encontrado ${req.originalUrl} en este servidor!`, 404));
});

app.use(ErrorHandler);

module.exports = app;