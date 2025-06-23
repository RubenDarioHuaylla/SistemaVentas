import { useState } from 'react';
import { Table, Button, Form, Row, Col, ListGroup, Badge, Alert, Modal} from 'react-bootstrap';

function Ventas() {
  // Datos mock
  const [clientes] = useState([
    { id: 1, nombre: "Juan Pérez", documento_identidad: "70123456" },
    { id: 2, nombre: "María García", documento_identidad: "71234567" }
  ]);

  const [productos] = useState([
    { id: 1, nombre: "Laptop HP", precio: 3500, stock: 15 },
    { id: 2, nombre: "Mouse Inalámbrico", precio: 80, stock: 50 },
    { id: 3, nombre: "Teclado Mecánico", precio: 120, stock: 30 }
  ]);

  const [carrito, setCarrito] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(item => item.id === producto.id);
    
    if (existe) {
      setCarrito(carrito.map(item =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
      ));
    } else {
      setCarrito([...carrito, {
        ...producto,
        cantidad,
        subtotal: producto.precio * cantidad
      }]);
    }
    setCantidad(1);
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const productosFiltrados = productos.filter(prod =>
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const confirmarVenta = () => {
    setShowConfirmModal(true);
  };

  const finalizarVenta = () => {
    // Lógica para "guardar" la venta (en memoria)
    alert(`Venta registrada para el cliente ${clienteSeleccionado}\nTotal: S/${calcularTotal().toFixed(2)}`);
    setCarrito([]);
    setClienteSeleccionado('');
    setShowConfirmModal(false);
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">💰 Registro de Ventas</h2>
      
      <Row className="mb-4 g-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Cliente *</Form.Label>
            <Form.Select
              value={clienteSeleccionado}
              onChange={(e) => setClienteSeleccionado(e.target.value)}
              required
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre} (DNI: {cliente.documento_identidad})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6} className="d-flex align-items-end">
          {clienteSeleccionado && (
            <Alert variant="info" className="mb-0 w-100">
              Cliente seleccionado: <strong>{clientes.find(c => c.id == clienteSeleccionado)?.nombre}</strong>
            </Alert>
          )}
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <div className="border p-3 rounded mb-4">
            <h4>🛒 Productos Disponibles</h4>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="🔍 Buscar producto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </Form.Group>

            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio Unit.</th>
                  <th>Stock</th>
                  <th style={{ width: '120px' }}>Cantidad</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map(prod => (
                  <tr key={prod.id}>
                    <td>{prod.nombre}</td>
                    <td>S/ {prod.precio.toFixed(2)}</td>
                    <td>{prod.stock}</td>
                    <td>
                      <Form.Control
                        type="number"
                        min="1"
                        max={prod.stock}
                        value={cantidad}
                        onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                      />
                    </td>
                    <td>
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => agregarAlCarrito(prod)}
                        disabled={prod.stock <= 0}
                      >
                        ➕ Agregar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>

        <Col lg={4}>
          <div className="border p-3 rounded bg-light">
            <h4>📝 Resumen de Venta</h4>
            
            {carrito.length === 0 ? (
              <Alert variant="secondary" className="text-center">
                No hay productos en el carrito
              </Alert>
            ) : (
              <>
                <ListGroup className="mb-3">
                  {carrito.map(item => (
                    <ListGroup.Item key={item.id}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{item.nombre}</strong>
                          <div className="text-muted small">
                            {item.cantidad} x S/{item.precio.toFixed(2)}
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="me-2">S/{(item.precio * item.cantidad).toFixed(2)}</span>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => eliminarDelCarrito(item.id)}
                          >
                            ✕
                          </Button>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                <div className="border-top pt-3">
                  <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                    <span>Total:</span>
                    <span>S/ {calcularTotal().toFixed(2)}</span>
                  </div>

                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={confirmarVenta}
                    disabled={!clienteSeleccionado || carrito.length === 0}
                  >
                    ✅ Confirmar Venta
                  </Button>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>

      {/* Modal de confirmación */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de registrar esta venta?</p>
          <ul>
            <li>Cliente: <strong>{clientes.find(c => c.id == clienteSeleccionado)?.nombre}</strong></li>
            <li>Total: <strong>S/{calcularTotal().toFixed(2)}</strong></li>
            <li>Productos: {carrito.reduce((sum, item) => sum + item.cantidad, 0)}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={finalizarVenta}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Ventas;