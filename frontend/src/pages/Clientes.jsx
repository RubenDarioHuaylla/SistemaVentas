import { Table, Button, Modal, Form, Alert,Row,Col } from 'react-bootstrap';
import { useState } from 'react';

function Clientes() {
  // Datos mock basados en tu estructura de BD
  const [clientes, setClientes] = useState([
    { id: 1, nombre: "Juan Pérez", documento_identidad: "70123456", direccion: "Av. Ejemplo 123", telefono: "987654321" },
    { id: 2, nombre: "María García", documento_identidad: "71234567", direccion: "Calle Demo 456", telefono: "987654322" }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    documento_identidad: '',
    direccion: '',
    telefono: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    const nuevoCliente = {
      id: clientes.length + 1,
      ...formData
    };
    setClientes([...clientes, nuevoCliente]);
    setShowModal(false);
    setFormData({ nombre: '', documento_identidad: '', direccion: '', telefono: '' });
  };

  const handleDelete = (id) => {
    setClientes(clientes.filter(cliente => cliente.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">📋 Gestión de Clientes</h2>
      <Button variant="primary" onClick={() => setShowModal(true)} className="mb-4">
        + Registrar Cliente
      </Button>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Documento</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.documento_identidad}</td>
              <td>{cliente.direccion}</td>
              <td>{cliente.telefono}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2">✏️ Editar</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(cliente.id)}>🗑️ Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para agregar cliente */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>👤 Registrar Nuevo Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre Completo *</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: Juan Pérez"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Documento de Identidad *</Form.Label>
                  <Form.Control
                    type="text"
                    name="documento_identidad"
                    value={formData.documento_identidad}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: 70123456"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    placeholder="Ej: Av. Ejemplo 123"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="Ej: 987654321"
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
            Guardar Cliente
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Clientes;