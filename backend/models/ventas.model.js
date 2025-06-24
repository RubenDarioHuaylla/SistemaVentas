const db = require('../db/connection');

const obtenerVentas = (callback) => {
  db.query(`
    SELECT v.*, c.nombre as cliente_nombre, u.nombre as usuario_nombre 
    FROM ventas v
    JOIN clientes c ON v.cliente_id = c.id
    JOIN usuarios u ON v.usuario_id = u.id
  `, callback);
};

const obtenerVentaPorId = (id, callback) => {
  db.query(`
    SELECT v.*, c.nombre as cliente_nombre, u.nombre as usuario_nombre 
    FROM ventas v
    JOIN clientes c ON v.cliente_id = c.id
    JOIN usuarios u ON v.usuario_id = u.id
    WHERE v.id = ?
  `, [id], callback);
};

const crearVenta = (datos, callback) => {
  const { cliente_id, usuario_id, total } = datos;
  db.query(
    'INSERT INTO ventas (cliente_id, usuario_id, total) VALUES (?, ?, ?)',
    [cliente_id, usuario_id, total],
    callback
  );
};

module.exports = {
  obtenerVentas,
  obtenerVentaPorId,
  crearVenta
};