
const Tutorial = require('../models/tutorial.model')
const factory = require('./factory.controller')
const numberFormat = require('./../utils/number-format')

exports.obtenerTutoriales = factory.obtenerTodos(Tutorial, { path: 'tema idioma fabricante' });
exports.crearTutorial   = factory.crear(Tutorial);
exports.obtenerTutorial = factory.obtener(Tutorial, { path: 'tema idioma fabricante' });
exports.actualizarTutorial = factory.actualizar(Tutorial);

exports.obtenerTutorialesPorTema = async (req, res, next) => {
	const documents = await Tutorial.countDocuments()
	const data = await Tutorial.obtenerTutorialesPorTema()

	res.status(200).json({ success: true, count: documents, data });
}

exports.obtenerTutorialesPorPublicado = async (req, res, next) => {
	const documents = await Tutorial.countDocuments()
	const data = await Tutorial.obtenerTutorialesPorPublicado()

  	res.status(200).json({ success: true, count: documents, data });
}

exports.obtenerTutorialesPorIdioma = async (req, res, next) => {
	const documents = await Tutorial.countDocuments()
	const data = await Tutorial.obtenerTutorialesPorIdioma()

  	res.status(200).json({ success: true, count: documents, data });
}

exports.obtenerTutorialesPorFabricante = async (req, res, next) => {
	const documents = await Tutorial.countDocuments()
	const data = await Tutorial.obtenerTutorialesPorFabricante()

  	res.status(200).json({ success: true, count: documents, data });
}

exports.obtenerTutorialesPorTemaPublicado = async (req, res, next) => {
	const documents = await Tutorial.countDocuments()
	const data = await Tutorial.obtenerTutorialesPorTemaPublicado()

  	res.status(200).json({ success: true, count: documents, data });
}

exports.obtenerTutorialesPorTemaFabricante = async (req, res, next) => {
	const documents = await Tutorial.countDocuments()
	const data = await Tutorial.obtenerTutorialesPorTemaFabricante()

  	res.status(200).json({ success: true, count: documents, data });
}

exports.obtenerTutorialesPorTemaIdioma = async (req, res, next) => {
	const documents = await Tutorial.countDocuments()
	const data = await Tutorial.obtenerTutorialesPorTemaIdioma()

  	res.status(200).json({ success: true, count: documents, data });
}