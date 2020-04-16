const Idioma = require('../models/idioma.model');
const factory = require('./factory.controller');

exports.obtenerIdiomas = factory.obtenerTodos(Idioma);
exports.obtenerIdioma  = factory.obtener(Idioma);
exports.crearIdioma = factory.crear(Idioma);
exports.actualizarIdioma = factory.actualizar(Idioma);