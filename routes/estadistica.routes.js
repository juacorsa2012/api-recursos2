const express = require('express');
const estadisticaController = require('../controllers/estadistica.controller');

const router = express.Router();

router
  .route('/')
  .get(estadisticaController.obtenerEstadisticas)

module.exports = router;