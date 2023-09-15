// AdminNavbar.jsx
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext'; // Importe useUser


const AdminNavbar = () => {
  const { handleLogout, userType } = useUser(); // Utilise handleLogout et userType depuis le contexte

  const onLogoutClick = () => {
    handleLogout(); // Appelle la fonction de déconnexion
  };

  console.log('userType:', userType);

  return (
    <Navbar className="admin-navbar" bg="dark" variant="dark" expand="lg">
      <div className="container">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="admin-nav-link" as={Link} to="/dashboard-admin">
              Tableau de bord
            </Nav.Link>
            <NavDropdown className="admin-nav-link" title="Mes dossiers" id="basic-nav-dropdown">
              <NavDropdown.Item className="admin-dropdown-item" as={Link} to="/admin/amo">
                AMO
              </NavDropdown.Item>
              <NavDropdown.Item className="admin-dropdown-item" as={Link} to="/admin/achat">
                Achat
              </NavDropdown.Item>
              <NavDropdown.Item className="admin-dropdown-item" as={Link} to="/admin/vente">
                Vente
              </NavDropdown.Item>
              <NavDropdown.Item className="admin-dropdown-item" as={Link} to="/admin/construction">
                Construction
              </NavDropdown.Item>
              <NavDropdown.Item className="admin-dropdown-item" as={Link} to="/admin/achat-revente">
                Achat / Revente
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown className="admin-nav-link" title="Actualités" id="basic-nav-dropdown">
              <NavDropdown.Item className="admin-dropdown-item" as={Link} to="/admin/news">
                News
              </NavDropdown.Item>
              <NavDropdown.Item className="admin-dropdown-item" as={Link} to="/admin/temoignages">
                Témoignages
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className="admin-nav-link" as={Link} to="/create-annonce">
              Créer Annonce
            </Nav.Link>
            <Nav.Link className="admin-nav-link" as={Link} to="/create-client">
              Créer Client
            </Nav.Link>
            <Nav.Link className="admin-nav-link" as={Link} to="/create-partenaire">
              Créer Partenaire
            </Nav.Link>
            {
  userType === 'admin' && (
    <Nav.Link className="admin-nav-link" as={Link} to="/create-adcom">
      Créer Adcom
    </Nav.Link>
  )
}


          </Nav>
          <Nav>
            <Nav.Link className="admin-nav-link" onClick={onLogoutClick}>Déconnexion</Nav.Link>  {/* Bouton de déconnexion */}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default AdminNavbar;
