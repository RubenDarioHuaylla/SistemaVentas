const UsuarioModel = require('../models/usuarios.model');
// Obtener todos los usuarios
const getUsuarios = (req, res) => {
  UsuarioModel.obtenerUsuarios((err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};
// Obtener un usuario por ID
const getUsuarioById = (req, res) => {
  UsuarioModel.obtenerUsuarioPorId(req.params.id, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    if (rows.length === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(rows[0]);
  });
};
// Crear un nuevo usuario
const createUsuario = (req, res) => {
  UsuarioModel.crearUsuario(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ mensaje: 'Usuario creado', id: result.insertId });
  });
};
// Actualizar un usuario existente
const updateUsuario = (req, res) => {
  UsuarioModel.actualizarUsuario(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: 'Usuario actualizado' });
  });
};
// Eliminar un usuario
const deleteUsuario = (req, res) => {
  UsuarioModel.eliminarUsuario(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: 'Usuario eliminado' });
  });
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
};