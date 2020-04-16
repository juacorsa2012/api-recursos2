const Enlace = require('./../models/enlace.model');
const Libro    = require('./../models/libro.model');
const Tutorial = require('./../models/tutorial.model');
const number_format = require('./../utils/number-format');
const duration_format = require('./../utils/duration-format');

exports.obtenerEstadisticas = async (req, res, next) => {
    const enlaces = await Enlace.obtenerEnlaces();
    const libros  = await Libro.obtenerLibros();
    const tutoriales = await Tutorial.obtenerTutoriales();
    const duracion = await Tutorial.obtenerTotalDuracion();
    const paginas = await Libro.obtenerPaginasTotales();
    
    const totalEnlaces = number_format(enlaces[0].count, 0);
    const totalLibros  = number_format(libros[0].count, 0);
    const totalPaginas = number_format(paginas[0].sum, 0);
    const totalTutoriales = number_format(tutoriales[0].count, 0);
    const totalDuracion   = duration_format(duracion[0].sum, 0);

    const estadisticas = {
        "enlaces" : totalEnlaces,
        "libros"  : totalLibros,
        "total_paginas" : totalPaginas,
        "tutoriales" : totalTutoriales,
        "total_duracion" : totalDuracion    
    }          

    res.status(201).json({ status: 'success', data: estadisticas});
};
