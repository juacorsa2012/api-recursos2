
const Libro = require('../models/libro.model')
const factory = require('./factory.controller')

exports.obtenerLibros = factory.obtenerTodos(Libro, { path: 'tema idioma editorial' })
exports.crearLibro    = factory.crear(Libro)
exports.obtenerLibro  = factory.obtener(Libro, { path: 'tema idioma editorial' })
exports.actualizarLibro = factory.actualizar(Libro)

exports.obtenerLibrosPorTema = async (req, res, next) => {
	const documents = await Libro.countDocuments()
	const data = await Libro.obtenerLibrosPorTema()

  	res.status(200).json({ success: true, libros: documents, data })
}

exports.obtenerLibrosPorPublicado = async (req, res, next) => {
	const documents = await Libro.countDocuments()
	const data = await Libro.obtenerLibrosPorPublicado()

	res.status(200).json({ success: true, count: documents, data })
}

exports.obtenerLibrosPorEditorial = async (req, res, next) => {
	const documents = await Libro.countDocuments()
	const data = await Libro.obtenerLibrosPorEditorial()
	  
	res.status(200).json({ success: true, count: documents, data })
}

exports.obtenerLibrosPorIdioma = async (req, res, next) => {
	const documents = await Libro.countDocuments()
	const data = await Libro.obtenerLibrosPorIdioma()

  	res.status(200).json({ success: true, count: documents, data })
}

exports.obtenerLibrosPorTemaPublicado = async (req, res, next) => {
	const documents = await Libro.countDocuments()
	const data = await Libro.obtenerLibrosPorTemaPublicado()

  	res.status(200).json({ success: true, count: documents, data })
}

exports.obtenerLibrosPorEditorialPublicado = async (req, res, next) => {
	const documents = await Libro.countDocuments()
	const data = await Libro.obtenerLibrosPorEditorialPublicado()

  	res.status(200).json({ success: true, count: documents, data })
}
