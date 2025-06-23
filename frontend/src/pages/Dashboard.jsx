import { Card, Row, Col, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function Dashboard() {
  const [stats, setStats] = useState({
    productos: 0,
    clientes: 0,
    ventas: 0
  });

  // Simula carga de datos (en un proyecto real, reemplaza con una API)
  useEffect(() => {
    // Ejemplo: aquí podrías hacer fetch a tu backend
    setTimeout(() => {
      setStats({
        productos: 10,
        clientes: 5,
        ventas: 8
      });
    }, 1000);
  }, []);

  return (
    <Container className="py-4">
      <h1 className="mb-4">📊 Bienvenido al Sistema de Ventas</h1>
      
      <div className="mb-4">
        <p className="lead">Selecciona una opción del menú para comenzar.</p>
      </div>

      <h4 className="mb-3">Resumen Rápido:</h4>
      
      <Row>
        <Col md={4} className="mb-3">
          <Card bg="primary" text="white">
            <Card.Body>
              <Card.Title>📦 Productos</Card.Title>
              <Card.Text>
                <span className="fs-2">{stats.productos}</span> registrados
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card bg="success" text="white">
            <Card.Body>
              <Card.Title>👥 Clientes</Card.Title>
              <Card.Text>
                <span className="fs-2">{stats.clientes}</span> registrados
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card bg="warning" text="dark">
            <Card.Body>
              <Card.Title>💰 Ventas Hoy</Card.Title>
              <Card.Text>
                <span className="fs-2">{stats.ventas}</span> realizadas
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;