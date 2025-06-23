import { Table, Button, Modal, Form, Badge,Row,Col } from 'react-bootstrap';
import { useState } from 'react';

function Productos() {
  // Datos mock basados en tu BD
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Laptop HP", precio: 3500, stock: 15 },
    { id: 2, nombre: "Mouse Inalámbrico", precio: 80, stock: 50 },
    { id: 3, nombre: "Teclado Mecánico", precio: 120, stock: 30 }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    stock: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    const nuevoProducto = {
      id: productos.length + 1,
      nombre: formData.nombre,
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock)
    };
    setProductos([...productos, nuevoProducto]);
    setShowModal(false);
    setFormData({ nombre: '', precio: '', stock: '' });
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">📦 Gestión de Productos</h2>
      <Button variant="success" onClick={() => setShowModal(true)} className="mb-4">
        + Añadir Producto
      </Button>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio (S/)</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(prod => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.nombre}</td>
              <td>{prod.precio.toFixed(2)}</td>
              <td>{prod.stock}</td>
              <td>
                <Badge bg={prod.stock > 10 ? "success" : "warning"}>
                  {prod.stock > 10 ? "Disponible" : "Bajo Stock"}
                </Badge>
              </td>
              <td>
                <Button variant="outline-primary" size="sm" className="me-2">✏️</Button>
                <Button variant="outline-danger" size="sm">🗑️</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para agregar producto */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>📦 Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
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
                    name="precio"
                    value={formData.precio}
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
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: 50"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Guardar Producto
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Productos;