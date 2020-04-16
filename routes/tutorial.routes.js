const express = require('express');
const tutorialController = require('../controllers/tutorial.controller');

const router = express.Router();

router.get('/estadisticas/temas', tutorialController.obtenerTutorialesPorTema);
router.get('/estadisticas/publicado', tutorialController.obtenerTutorialesPorPublicado);
router.get('/estadisticas/idiomas', tutorialController.obtenerTutorialesPorIdioma);
router.get('/estadisticas/fabricante', tutorialController.obtenerTutorialesPorFabricante);
router.get('/estadisticas/tema/publicado', tutorialController.obtenerTutorialesPorTemaPublicado);
router.get('/estadisticas/tema/fabricante', tutorialController.obtenerTutorialesPorTemaFabricante);
router.get('/estadisticas/tema/idioma', tutorialController.obtenerTutorialesPorTemaIdioma);

router
  .route('/')
  .get(tutorialController.obtenerTutoriales)
  .post(tutorialController.crearTutorial)
  
router
  .route('/:id')
  .get(tutorialController.obtenerTutorial)
  .put(tutorialController.actualizarTutorial)

module.exports = router;