import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert, Spinner, Badge,Row, Col } from 'react-bootstrap';
import { 
  getProductos, 
  createProducto, 
  updateProducto, 
  deleteProducto 
} from '../services/productoService'; // Asegúrate de que la ruta sea correcta

function Productos() {
  // Estados
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProducto, setCurrentProducto] = useState({
    id: null,
    nombre: '',
    precio: '',
    stock: ''
  });

  // Obtener productos al cargar el componente
  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await getProductos();
      setProductos(response.data);
    } catch (err) {
      setError("Error al cargar productos: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProducto({
      ...currentProducto,
      [name]: value
    });
  };

  // Enviar formulario (crear/editar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateProducto(currentProducto.id, currentProducto);
      } else {
        await createProducto(currentProducto);
      }
      fetchProductos(); // Refrescar la lista
      handleCloseModal();
    } catch (err) {
      setError(`Error al ${isEditing ? 'editar' : 'crear'} producto: ${err.message}`);
    }
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await deleteProducto(id);
        fetchProductos(); // Refrescar la lista
      } catch (err) {
        setError("Error al eliminar producto: " + err.message);
      }
    }
  };

  // Abrir modal para editar
  const handleEdit = (producto) => {
    setCurrentProducto({
      id: producto.id, 
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock
    });
    setIsEditing(true);
    setShowModal(true);
  };

  // Cerrar modal y resetear estado
  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentProducto({ id: null, nombre: '', precio: '', stock: '' });
    setError(null);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="mb-4">📦 Gestión de Productos</h2>
      
      {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

      <Button 
        variant="success" 
        onClick={() => setShowModal(true)}
        className="mb-4"
      >
        + Añadir Producto
      </Button>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Precio (S/)</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.precio.toFixed(2)}</td>
              <td>{producto.stock}</td>
              <td>
                <Badge bg={producto.stock > 10 ? "success" : "warning"}>
                  {producto.stock > 10 ? "Disponible" : "Bajo Stock"}
                </Badge>
              </td>
              <td>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="me-2"
                  onClick={() => handleEdit(producto)}
                >
                  ✏️ Editar
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => handleDelete(producto._id)}
                >
                  🗑️ Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para crear/editar */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "✏️ Editar Producto" : "➕ Nuevo Producto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={currentProducto.nombre}
                onChange={handleInputChange}
                required
                placeholder="Ej: Laptop HP"
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Precio (S/) *</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0.01"
                    name="precio"
                    value={currentProducto.precio}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: 999.99"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock *</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    name="stock"
                    value={currentProducto.stock}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: 50"
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-end mt-3">
              <Button variant="secondary" onClick={handleCloseModal} className="me-2">
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                {isEditing ? "Guardar Cambios" : "Crear Producto"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Productos;