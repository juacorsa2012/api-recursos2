const express = require('express');
const libroController = require('../controllers/libro.controller');

const router = express.Router();

router.get('/estadisticas/temas', libroController.obtenerLibrosPorTema);
router.get('/estadisticas/publicado', libroController.obtenerLibrosPorPublicado);
router.get('/estadisticas/editorial', libroController.obtenerLibrosPorEditorial);
router.get('/estadisticas/idioma', libroController.obtenerLibrosPorIdioma);
router.get('/estadisticas/tema/publicado', libroController.obtenerLibrosPorTemaPublicado);
router.get('/estadisticas/editorial/publicado', libroController.obtenerLibrosPorEditorialPublicado);

router
  .route('/')
  .get(libroController.obtenerLibros)
  .post(libroController.crearLibro)
  
router
  .route('/:id')
  .get(libroController.obtenerLibro)
  .put(libroController.actualizarLibro)

module.exports = router;