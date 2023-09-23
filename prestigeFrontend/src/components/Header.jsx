// header.jsx
import React, { useState, useEffect, useRef } from 'react'; // Importez useRef depuis React
import { useLocation } from 'react-router-dom'; // Importez useLocation depuis react-router-dom
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';


import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import LoginForm from './formulaires/LoginForm'; // Assurez-vous d'importer votre composant LoginForm
import AdminNavbar from './adcom/AdminNavbar';

function CustomNavbar() {
  const [navExpanded, setNavExpanded] = useState(false);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

  const handleCustomNavCollapse = () => {
    setNavExpanded(!navExpanded);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (isLoginFormVisible) {
        const loginForm = document.getElementById('login-form');
        if (loginForm && !loginForm.contains(event.target)) {
          setIsLoginFormVisible(false);
        }
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [isLoginFormVisible]);

  
}

function Header({ onLogin }) {
  const { isLoggedIn, userFirstName, userType, setUserType } = useUser();
  // Ajoute userType
  // console.log("Header isLoggedIn:", isLoggedIn);  // Ajoute cette ligne
  // console.log("Header userFirstName:", userFirstName);  // Ajoute cette ligne
  // console.log("userType:", userType);
// Ajoute ce useEffect pour mettre à jour userType depuis le localStorage
useEffect(() => {
  const storedUserType = localStorage.getItem('userType');
  if (storedUserType) {
    setUserType(storedUserType);
  }
}, []);


 ;
  const [navExpanded, setNavExpanded] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const headerRef = useRef();
  const navbarRef = useRef();
  const navRef = useRef();


  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Fermer le formulaire de connexion lorsque l'utilisateur navigue vers une nouvelle page
    setShowLoginForm(false);
  }, [location]);

  const handleNavCollapse = () => {
    setNavExpanded(!navExpanded);
  };

  const handleCloseLoginForm = () => {
    setShowLoginForm(false);
  };

  const handleToggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Vérifiez si le clic a eu lieu en dehors du header, de la navbar ou de l'élément de connexion
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target) &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        !event.target.classList.contains('login-form') // Assurez-vous que vous ne fermez pas lorsque vous cliquez sur le formulaire de connexion lui-même
      ) {
        // Clique à l'extérieur du header, de la navbar et du formulaire de connexion, fermez le formulaire
        setShowLoginForm(false);
      }
    };

    // Ajoutez le gestionnaire d'événements pour les clics à l'extérieur du header, de la navbar et du formulaire de connexion
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Retirez le gestionnaire d'événements lorsque le composant est démonté
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleLoginFormSubmit = async (formData) => {
    try {
      const response = await axios.post('http://127.0.0.1:3000/login', {
        email: formData.email,
        password: formData.password,
      });
  
      if (response.data.success) {
        const firstName = response.data.firstName;
        onLogin(firstName); // Utilise la fonction onLogin pour mettre à jour userFirstName
        handleCloseLoginForm(); // Fermer le formulaire de connexion
      } else {
        console.error('Échec de la connexion :', response.data.message);
      }
    } catch (error) {
      console.error('Erreur de connexion :', error);
    }
  };
  
  
  const handleHeaderClick = () => {
    // Fermer le formulaire lorsque l'utilisateur clique sur le header (en dehors du formulaire)
    if (showLoginForm) {
      setShowLoginForm(false);
    }
  };
  
  

  

  return (
    <header ref={(node) => { headerRef.current = node; navbarRef.current = node; }}>
    {location.pathname === '/' ? (
      <div style={{ textAlign: 'center', margin: '10px 0' }}>
        <h1>Prestige Habitat</h1>
        <h4>L'immobilier de A à Z</h4>
      </div>
    ) : (
      <div style={{ textAlign: 'left', margin: '10px 0' }}>
        <h3>Prestige Habitat</h3>
      </div>
    )}
    {isLoggedIn && (
        <div style={{ textAlign: 'right', margin: '10px 0' }}>
          <span>Bonjour, {userFirstName} !</span>
        </div>
      )}
{(userType === 'admin' || userType === 'commercial') ? (// Le contenu auquel ont accès les admins et les commerciaux
        <AdminNavbar /> // Utilise la navbar admin
      ) : (
      <Navbar
        className="custom-navbar"
   
        variant="dark"
        expand="lg"
        expanded={navExpanded}
        onToggle={handleNavCollapse}
        ref={navRef} 
      >
        <div className="container">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
                Accueil
              </Nav.Link>
              <NavDropdown title="Nos services" id="basic-nav-dropdown">
                
                <NavDropdown.Item as={Link} to="/amo">
                  AMO
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/search">
                  Achat
                </NavDropdown.Item>
                
                <NavDropdown.Item as={Link} to="/services/vente">
                  Vente
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/services/Construction">
                  Construction
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/purchaseresalpage">
                  Achat / Revente
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/services/qui-sommes-nous">
                  Qui sommes-nous
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/services/nos-valeurs">
                  Nos valeurs
                </NavDropdown.Item>
              </NavDropdown>
              {isLoggedIn ? (  <>  
                <Nav.Link as={Link} to="/news/News">
                News
      </Nav.Link>
      <Nav.Link as={Link} to="/creation-temoignage">
        Ecrire un témoignage
      </Nav.Link>  </>) :(
              
              <NavDropdown title="Actualités" id="basic-nav-dropdown">

                <NavDropdown.Item as={Link} to="/news/News">
                  News
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/news/temoignages">
                  Témoignages
                </NavDropdown.Item>
              </NavDropdown>
              
              )}
             
            </Nav>
           
            <Nav>
  {isLoggedIn ? (
    <>
      
      <Nav.Link as={Link} to="/dashboard">
        Mon Compte
      </Nav.Link>
    </>
  ) : (
    <Nav.Link onClick={handleToggleLoginForm}>Connexion</Nav.Link>
  )}
</Nav>

          </Navbar.Collapse>
        </div>
      </Navbar>
)}
     {/* Afficher le formulaire de connexion si nécessaire */}
      {showLoginForm && !isLoggedIn && (
       
          <div
            className="login-form"
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%', // Centre le formulaire horizontalement
              transform: 'translateX(65%)', // Centre horizontalement le formulaire
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '30%',
            }}
          >
            <LoginForm onLoginFormSubmit={handleLoginFormSubmit} onCloseLoginForm={handleCloseLoginForm} onLogin={onLogin} />

          </div>
        
      )}
    </header>
  );
}


export default Header;
