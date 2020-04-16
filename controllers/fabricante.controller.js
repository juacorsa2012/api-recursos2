const Fabricante = require('../models/fabricante.model');
const factory = require('./factory.controller');

exports.obtenerFabricantes = factory.obtenerTodos(Fabricante);
exports.obtenerFabricante  = factory.obtener(Fabricante);
exports.crearFabricante = factory.crear(Fabricante);
exports.actualizarFabricante = factory.actualizar(Fabricante);