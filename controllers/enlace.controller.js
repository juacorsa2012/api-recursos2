const Enlace  = require('../models/enlace.model')
const factory = require('./factory.controller')

const numberFormat = require('./../utils/number-format')

exports.obtenerEnlaces = factory.obtenerTodos(Enlace, { path: 'tema' });
exports.crearEnlace = factory.crear(Enlace);
exports.obtenerEnlace = factory.obtener(Enlace, { path: 'tema' });
exports.actualizarEnlace = factory.actualizar(Enlace);


exports.obtenerEnlacesPorTemas = async (req, res, next) => {
	const documents = await Enlace.countDocuments();
	const data = await Enlace.obtenerEnlacesPorTema();

	stats = []
	data.forEach(function (item) {	
		stats.push({
			"count" : numberFormat(item.count, 0),
			"tema"  : item.tema,
			"peso"  : item.peso.toFixed(2).replace('.',',') + '%'
		})		
	})

  	res.status(200).json({ success: true, enlaces: documents, stats })
};
