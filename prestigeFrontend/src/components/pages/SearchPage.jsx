import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SearchPageOption from './SearchPageOption';
import axios from 'axios'; // Importe Axios ici

const SearchPage = ({ onSubmit }) => {
 
  const [searchData, setSearchData] = useState({
    city: "",
    propertyType: "",
    purchaseType: "",
    houseSurface: "",
    landSurface: "",
    numRooms: "",
    numBedrooms: "",
    numWC: "",
    numBathrooms: "",
    budgetMin: "",
    budgetMax: "",
    heating: "",
    amenities: "",
  });

  const [files, setFiles] = useState(undefined);

  // const [validate, isTouched, isValid, getMessages, markAsTouched] = useFormValidation({
  //   city: [
  //     c => c === "" ? "Required. " : "",
  //     // Ajoute d'autres règles pour 'city' si nécessaire
  //   ],
  //   propertyType: [
  //     // Règles pour 'propertyType'
  //   ],
  //   purchaseType: [
  //     // Règles pour 'purchaseType'
  //   ],
  //   houseSurface: [
  //     hs => hs < 0 ? "Must be greater or equal to 0. " : ""
  //   ],
  //   // ... autres champs
  // });
  const [localSearchData, setLocalSearchData] = useState(searchData || {});
  console.log("Parent searchData:", searchData);


  const [showOptions, setShowOptions] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    const newSearchData = { ...searchData, [name]: value };
    setSearchData(newSearchData);
    validate(newSearchData, name);
  };
  const [announcements, setAnnouncements] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const apiURL = 'http://127.0.0.1:3000/api/search';
      const response = await axios.get(apiURL, { params: searchData });
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Erreur pendant la récupération des annonces:', error);
    }
  };
  const handleSearchDataChange = async (newSearchData) => {
    setSearchData(newSearchData);
    try {
      const apiURL = 'http://127.0.0.1:3000/api/search';
      const response = await axios.get(apiURL, { params: newSearchData });
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Erreur pendant la récupération des annonces:', error);
    }
  };
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
 

  useEffect(() => {
    validate(searchData);
  }, [searchData]);

const CustomPrevArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, display: 'block', background: 'red' }}
    onClick={onClick}
  />
);

const CustomNextArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, display: 'block', background: 'red' }}
    onClick={onClick}
  />
);

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
  centerMode: true,
  centerPadding: '0',
  cssEase: 'linear',
  variableWidth: true,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
};


  const [carouselItems, setCarouselItems] = useState([]);

  // Charger les éléments du carrousel depuis l'API au montage du composant
  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/carousel');
        setCarouselItems(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement du carrousel:', error);
      }
    };

    fetchCarouselItems();
  }, []);
  return (
    <div>
      <div className='search-bar'>
        {/* Input de city */}
        <input
          className="auth-form-input"
          type="text"
          placeholder="city"
          value={city}
          onChange={(e) => setcity(e.target.value)}
          style={{ width: '200px', marginRight: '10px', padding: '8px' }}
        />
        {/* Liste déroulante pour le rayon 
        <select value={radius} onChange={handleRadiusChange} style={{ width: '8%', marginRight: '10px' }}>
          <option value="0">0 km</option>
          <option value="5">5 km</option>
          <option value="10">10 km</option>
          <option value="20">20 km</option>
          <option value="50">50 km</option>
        </select>*/}
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
  value={searchData.houseSurfaceMin}
  onChange={(e) => setSearchData({ ...searchData, houseSurfaceMin: e.target.value })}
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
          <button className="custom-btn primary-btn me-2" onClick={handleSubmit}>
            Rechercher
          </button>

          {/* Bouton Plus d'options */}
          {/* Bouton Plus d'options */}
        <button onClick={toggleOptions} className="search-button">
          Plus d'options
        </button>
      </div>
      </div><br />

     {/* Carrousel des annonces coup de coeur */}
     <div className="carousel-container">
        <h3>Nos coups de coeur</h3><br />
        <Slider {...sliderSettings}>
          {carouselItems.map((item) => (
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
 {/* Affichage des résultats de recherche */}
 <div>
      <SearchPageOption searchData={searchData} onSearchDataChange={handleSearchDataChange} />
      {/* Ici, tu peux afficher les annonces */}
    </div>
      {/* Affichage de la carte à l'extérieur de la barre de recherche */}
      <div className="map-container" style={{ height: '400px', marginTop: '20px' }}>
        {/* Composant de la carte à venir */}
      </div>
    </div>
  );
};

export default SearchPage;
