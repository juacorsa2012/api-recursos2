const Tema = require('../models/tema.model');
const factory = require('./factory.controller');

exports.obtenerTemas = factory.obtenerTodos(Tema);
exports.obtenerTema  = factory.obtener(Tema);
exports.crearTema = factory.crear(Tema);
exports.actualizarTema = factory.actualizar(Tema);