const ProductoModel = require('../models/productos.model');
// Obtener todos los productos
const getProductos = (req, res) => {
  ProductoModel.obtenerProductos((err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};
// Obtener un producto por ID
const getProductoById = (req, res) => {
  ProductoModel.obtenerProductoPorId(req.params.id, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    if (rows.length === 0) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(rows[0]);
  });
};
// Crear un nuevo producto
const createProducto = (req, res) => {
  ProductoModel.crearProducto(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ mensaje: 'Producto creado', id: result.insertId });
  });
};
// Actualizar un producto existente
const updateProducto = (req, res) => {
  ProductoModel.actualizarProducto(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: 'Producto actualizado' });
  });
};
// Eliminar un producto
const deleteProducto = (req, res) => {
  ProductoModel.eliminarProducto(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: 'Producto eliminado' });
  });
};

module.exports = {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
};