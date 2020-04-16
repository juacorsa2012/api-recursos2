const express = require('express');
const enlaceController = require('../controllers/enlace.controller');

const router = express.Router();

router.get('/estadisticas/temas', enlaceController.obtenerEnlacesPorTemas);

router
  .route('/')
  .get(enlaceController.obtenerEnlaces)
  .post(enlaceController.crearEnlace)
  
router
  .route('/:id')
  .get(enlaceController.obtenerEnlace)
  .put(enlaceController.actualizarEnlace)

module.exports = router;