import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="bg-dark text-white p-3" style={{ width: '250px', minHeight: '100vh' }}>
      <h4 className="text-center mb-4">Menú</h4>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/dashboard" className="text-white mb-2">
          <i className="bi bi-speedometer2 me-2"></i> Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/productos" className="text-white mb-2">
          <i className="bi bi-box-seam me-2"></i> Productos
        </Nav.Link>
        <Nav.Link as={Link} to="/clientes" className="text-white mb-2">
          <i className="bi bi-people me-2"></i> Clientes
        </Nav.Link>
        <Nav.Link as={Link} to="/ventas" className="text-white mb-2">
          <i className="bi bi-cart me-2"></i> Ventas
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default Sidebar;