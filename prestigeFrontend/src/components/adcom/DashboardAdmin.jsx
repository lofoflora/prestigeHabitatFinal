import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function DashboardAdmin() {
  const navigate = useNavigate();

  const navigateToClientsList = () => {
    navigate('/list-client');
  };
 
  // Styles pour le conteneur principal
  const dashboardStyle = {
    border: '1px solid #ccc', // Bordure autour de la page
    padding: '20px', // Espace intérieur de la page
    display: 'flex', // Utilisation de flexbox pour aligner les éléments
    flexDirection: 'column', // Alignement en colonnes
    alignItems: 'center', // Centrer horizontalement
  };

  // Styles pour les rangées (alignées horizontalement)
  const rowStyle = {
    display: 'flex', // Utilisation de flexbox pour aligner les éléments
    justifyContent: 'space-between', // Espacement égal entre les éléments
    width: '100%', // Largeur maximale
    marginBottom: '20px', // Espace entre les rangées
  };

 // Styles pour chaque section (éléments côte à côte)
const sectionStyle = {
    padding: '10px', // Espace intérieur de la section
    textAlign: 'center', // Texte centré horizontalement
    width: '48%', // Largeur de chaque section
    border: '2px solid blue',  // Contour bleu (comme la barre de navigation admin)
    borderRadius: '20px',
    backgroundColor: 'transparent', // Fond transparent (comme la barre de navigation admin)
    boxShadow: '0px 0px 10px blue',  // Légère ombre bleue (comme la barre de navigation admin)
    color: 'blue', // Couleur du texte bleue (comme la barre de navigation admin)
  };
  

  
  // Styles pour les titres (couleur bleue)
  const h4Style = {
    color: 'blue', // La couleur bleue que vous souhaitez
    WebkitTextStroke: '0.3px white', // Contour blanc autour des lettres (utilisation du préfixe Webkit pour une meilleure compatibilité)
  };

  // Styles pour les boutons
  const buttonStyle = {
    backgroundColor: 'blue', // Fond transparent (comme la barre de navigation admin)
    color: 'white', // Couleur du texte bleue (comme la barre de navigation admin)
    border: '2px solid blue',  // Contour bleu (comme la barre de navigation admin)
    borderRadius: '20px',
  };
  const subSectionStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };
  
  const paragraphStyle = {
    marginRight: '100px', // Ajoute un espace de 10px entre le paragraphe et le bouton
  };
  
  <div className="dashboard">
   {/* Première rangée */}
   <div style={rowStyle}>
    <div style={sectionStyle}>
      <h4 style={h4Style}>Dernière mise à jour des dossiers</h4>
      (Tableau pour l'affichage des derniers dossiers)
    </div>
    <div className="sub-section" style={{ display: 'grid', gridTemplateColumns: '1fr auto', columnGap: '10px', alignItems: 'center' }}>
  <p>Opérations à valider</p>
  <button className="button" onClick={() => navigateToValidation()}>
    A valider
  </button>
</div>

  </div>
  </div>
  
  return (
    <div className="dashboard"  >
      {/* Première rangée */}
  <div style={rowStyle}>
    <div style={sectionStyle}>
      <h4 style={h4Style}>Dernière mise à jour des dossiers</h4>
      (Tableau pour l'affichage des derniers dossiers)
    </div>
    <div className="sub-section">
      <p style={{ marginRight: '10px' }}>Opérations à valider</p> {/* Ajout de la marge à droite ici */}
      <button  style={buttonStyle}  onClick={() => navigateToValidation()}>
        A valider
      </button>
    </div>
  </div>

      {/* Deuxième rangée */}
      <div style={rowStyle}>
        <div style={sectionStyle}>
          <h4 style={h4Style}>Liste des Clients</h4>
          <button style={buttonStyle}>
          <Link to="/list-client"> Liste des clients</Link>
  </button>
        </div>
        <div style={sectionStyle}>
          <h4 style={h4Style}>Liste des partenaires</h4>
          <button style={buttonStyle} >
          <Link to="/list-partner"> Liste des partenaires </Link>
          </button>
        </div>
      </div>

      {/* Troisième rangée */}
      <div style={rowStyle}>
        <div style={sectionStyle}>
          <h4 style={h4Style}>Dossier AMO</h4>
          <button style={buttonStyle}>
  <Link to="/list-amo">Dossier AMO</Link>
</button>
        </div>
        <div style={sectionStyle}>
          <h4 style={h4Style}>Dossier Achat</h4>
          <button style={buttonStyle} >
          <Link to="/list-achat"> Dossier Achat</Link>
          </button>
        </div>
        <div style={sectionStyle}>
          <h4 style={h4Style}>Dossier Vente</h4>
          <button style={buttonStyle} >
          <Link to="/list-vente">  Dossier Vente</Link>
          </button>
        </div>
      </div>

      {/* Quatrième rangée */}
      <div style={rowStyle}>
        <div style={sectionStyle}>
          <h4 style={h4Style}>Dossier Achat/Revente</h4>
          <button style={buttonStyle} >
          <Link to="/list-achat-revente"> Dossier Achat/Revente</Link>
          </button>
        </div>
        <div style={sectionStyle}>
          <h4 style={h4Style}>Dossier Suivi de Construction</h4>
          <button style={buttonStyle} >
          <Link to="/list-construction">  Dossier Suivi de Construction</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
