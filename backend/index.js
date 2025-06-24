const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
// Usa esto (equivalente y más moderno):
app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true })); // Para formularios HTML

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/clientes', require('./routes/clientes.routes'));
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/ventas', require('./routes/ventas.routes'));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});