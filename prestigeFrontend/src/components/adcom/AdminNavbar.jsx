// AdminNavbar.jsx
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';// Importe useUser

const AdminNavbar = () => {
  const { handleLogout } = useUser();  // Utilise handleLogout depuis le contexte

  const onLogoutClick = () => {
    handleLogout();  // Appelle la fonction de déconnexion
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <div className="container">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/admin">
              Tableau de bord
            </Nav.Link>
            <NavDropdown title="Nos services" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/admin/amo">
                AMO
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/achat">
                Achat
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/vente">
                Vente
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/construction">
                Construction
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/achat-revente">
                Achat / Revente
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Actualités" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/admin/news">
                News
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/temoignages">
                Témoignages
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/admin/create-annonce">
              Créer Annonce
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/create-client">
              Créer Client
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/create-partenaire">
              Créer Partenaire
            </Nav.Link>
          </Nav>
           <Nav>
            <Nav.Link onClick={onLogoutClick}>Déconnexion</Nav.Link>  {/* Bouton de déconnexion */}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default AdminNavbar;
