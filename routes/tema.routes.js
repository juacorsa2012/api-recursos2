
const express = require('express');
const temaController = require('./../controllers/tema.controller');
const authController = require('./../controllers/auth.controller');

const router = express.Router();

router
  .route('/')
  .get(temaController.obtenerTemas)
  .post(temaController.crearTema);

router
  .route('/:id')
  .get(temaController.obtenerTema) 
  .put(temaController.actualizarTema) 

module.exports = router;