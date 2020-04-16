const Editorial = require('../models/editorial.model');
const factory = require('./factory.controller');

exports.obtenerEditoriales  = factory.obtenerTodos(Editorial);
exports.obtenerEditorial    = factory.obtener(Editorial);
exports.actualizarEditorial = factory.actualizar(Editorial);
exports.crearEditorial = factory.crear(Editorial);