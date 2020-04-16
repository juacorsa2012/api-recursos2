
const express = require('express');
const idiomaController = require('./../controllers/idioma.controller');

const router = express.Router();

router
  .route('/')
  .get(idiomaController.obtenerIdiomas)
  .post(idiomaController.crearIdioma)

router
  .route('/:id')
  .get(idiomaController.obtenerIdioma)
  .put(idiomaController.actualizarIdioma)

module.exports = router;