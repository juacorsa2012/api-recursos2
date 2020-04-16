const express = require('express');
const editorialController = require('./../controllers/editorial.controller');

const router = express.Router();

router
  .route('/')
  .get(editorialController.obtenerEditoriales)
  .post(editorialController.crearEditorial)

router
  .route('/:id')
  .get(editorialController.obtenerEditorial)
  .put(editorialController.actualizarEditorial)

module.exports = router;