const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventas.controller');

router.get('/', ventaController.getVentas);
router.get('/:id', ventaController.getVentaById);
router.post('/', ventaController.createVenta);

module.exports = router;