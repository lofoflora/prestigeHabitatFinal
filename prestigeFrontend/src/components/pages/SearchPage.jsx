import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SearchPageOption from './SearchPageOption';

// Exemple de données pour les annonces coup de coeur
const carouselData = [
  {
    id: 1,
    title: 'Annonce 1',
    image: 'https://img.leboncoin.fr/api/v1/lbcpb1/images/d6/33/fd/d633fd4a222bd379498f5e410b592a7117baffce.jpg?rule=classified-628x380-avif',
    description: 'Description de l\'annonce 1',
  },
  {
    id: 2,
    title: 'Annonce 2',
    image: 'src/assets/maisons/maison1.jpg',
    description: 'Description de l\'annonce 2',
  },
  {
    id: 3,
    title: 'Annonce 3',
    image: 'src/assets/maisons/maison2.jpg',
    description: 'Description de l\'annonce 3',
  },
  {
    id: 4,
    title: 'Annonce 4',
    image: 'src/assets/maisons/maison3.jpg',
    description: 'Description de l\'annonce 4',
  },
  {
    id: 5,
    title: 'Annonce 5',
    image: 'https://mmf.logic-immo.com/mmf/ads/photo-crop-368x250/fdf/2/2789a2a3-420b-40fe-827d-e87fe1f2f124.jpg',
    description: 'Description de l\'annonce 5',
  },
  {
    id: 6,
    title: 'Annonce 6',
    image: 'https://static.orpi.com/images/ego-realestate/estate-result-item/Zfeed/S5/C8385/P18642308/Tphoto/ID84751c01-0000-0500-0000-00000c2fa249--.jpg',
    description: 'Description de l\'annonce 6',
  },
  // Ajoutez d'autres annonces coup de coeur ici...
];

const SearchPage = () => {
  const [selectedLocalites, setSelectedLocalites] = useState([]);
  const [propertyType, setPropertyType] = useState('');
  const [surfaceMin, setSurfaceMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [radius, setRadius] = useState('5');
  const [showOptions, setShowOptions] = useState(false);

  // Composant CustomPrevArrow
const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'red' }}
      onClick={onClick}
    />
  );
};

// Composant CustomNextArrow
const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'red' }}
      onClick={onClick}
    />
  );
};

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: true, // Pour centrer les images
    centerPadding: '0', // Pas de padding pour éviter l'espace supplémentaire sur les côtés
    cssEase: 'linear', // Effet circulaire linéaire
    variableWidth: true, // Pour que les images prennent la largeur variable en fonction de leur contenu
    prevArrow: <CustomPrevArrow />, // Utilisation de flèches personnalisées pour le carrousel
    nextArrow: <CustomNextArrow />,
  };

  const handleLocaliteChange = (selectedOptions) => {
    setSelectedLocalites(selectedOptions);
  };

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleRadiusChange = (e) => {
    setRadius(e.target.value);
  };

  const handleSearch = () => {
    // Logique de recherche...
  };

  return (
    <div>
      <div className='search-bar'>
        {/* Input de localisation */}
        <input
          className="auth-form-input"
          type="text"
          placeholder="Localisation"
          value={localisation}
          onChange={(e) => setLocalisation(e.target.value)}
          style={{ width: '200px', marginRight: '10px', padding: '8px' }}
        />
        {/* Liste déroulante pour le rayon */}
        <select value={radius} onChange={handleRadiusChange} style={{ width: '8%', marginRight: '10px' }}>
          <option value="0">0 km</option>
          <option value="5">5 km</option>
          <option value="10">10 km</option>
          <option value="20">20 km</option>
          <option value="50">50 km</option>
        </select>
        {/* Liste déroulante (Select) */}
        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} style={{ marginRight: '10px' }}>
          <option value="">Type de bien</option>
          <option value="appartement">Appartement</option>
          <option value="maison">Maison / Villa</option>
          <option value="terrain">Terrain</option>
        </select>
        {/* Champ de saisie pour Surface min */}
        <input
          className="auth-form-input"
          type="number"
          placeholder="Surface min [m²]"
          value={surfaceMin}
          onChange={(e) => setSurfaceMin(e.target.value)}
          style={{ width: '120px', marginRight: '10px', padding: '8px' }}
        />
        {/* Champ de saisie pour Budget max */}
        <input
          className="auth-form-input"
          type="number"
          placeholder="Budget max [€]"
          value={budgetMax}
          onChange={(e) => setBudgetMax(e.target.value)}
          style={{ width: '120px', marginRight: '10px', padding: '8px' }}
        />
        <div>
          {/* Bouton Rechercher */}
          <button className="custom-btn primary-btn me-2" onClick={handleSearch}>
            Rechercher
          </button>

          {/* Bouton Plus d'options */}
          <Link to="/search-options" className="search-button">
            Plus d'options
          </Link>
        </div>
      </div><br />

     {/* Carrousel des annonces coup de coeur */}
     <div className="carousel-container">
      <h3>Nos coups des coeurs</h3><br />
        <Slider {...sliderSettings}>
          {carouselData.map((item) => (
            <div key={item.id} style={{ width: '300px', height: '200px', margin: '0 10px' }}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '300px', height: '200px', borderRadius: '10px' }}
                />
              </a>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </Slider>
      </div>


      {/* Affichage du formulaire SearchPageOption conditionnellement */}
      {showOptions && <SearchPageOption />}

      {/* Affichage des résultats de recherche */}
      <div className="search-results">
        {/* Ici, vous pouvez afficher les résultats de recherche */}
      </div>

      {/* Affichage de la carte à l'extérieur de la barre de recherche */}
      <div className="map-container" style={{ height: '400px', marginTop: '20px' }}>
        {/* Composant de la carte à venir */}
      </div>
    </div>
  );
};

export default SearchPage;
