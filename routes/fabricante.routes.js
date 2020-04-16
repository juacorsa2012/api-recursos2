
const express = require('express');
const fabricanteController = require('./../controllers/fabricante.controller');

const router = express.Router();

router
  .route('/')
  .get(fabricanteController.obtenerFabricantes)
  .post(fabricanteController.crearFabricante)

router
  .route('/:id')
  .get(fabricanteController.obtenerFabricante)
  .put(fabricanteController.actualizarFabricante)

module.exports = router;