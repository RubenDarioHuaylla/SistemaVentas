const VentaModel = require('../models/ventas.model');

const getVentas = (req, res) => {
  VentaModel.obtenerVentas((err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};

const getVentaById = (req, res) => {
  VentaModel.obtenerVentaPorId(req.params.id, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    if (rows.length === 0) return res.status(404).json({ mensaje: 'Venta no encontrada' });
    res.json(rows[0]);
  });
};

const createVenta = (req, res) => {
  VentaModel.crearVenta(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ mensaje: 'Venta creada', id: result.insertId });
  });
};

module.exports = {
  getVentas,
  getVentaById,
  createVenta
};