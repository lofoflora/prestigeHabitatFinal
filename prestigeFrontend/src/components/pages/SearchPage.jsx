import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SearchPageOption from './SearchPageOption';
import axios from 'axios'; // Assure-toi que Axios est correctement installé et importé.
import { Link } from 'react-router-dom';

// Importe le hook useFormValidation ici (si tu l'as déjà créé).

const SearchPage = ({ onSubmit }) => {
  const [searchData, setSearchData] = useState({

    city: "",
    latitude: "",
    longitude: "",
    propertyType: "",
    purchaseType: "",
    houseSurface: "",
    landSurface: "",
    numRooms: "",
    numBedrooms: "",
    numWC: "",
    numBathrooms: "",
    budget: "",
    heating: "",
    amenities: "",
    actif: "true",
    surfaceMin: "0",
    surfaceMax: "",
    surfaceTerrainMax: "",
    surfaceTerrainMin: "0",
    budgetMin: "0",
    budgetMax: "",
    description:"",

  });
  console.log("Parent searchData:", searchData);
  const [showOptions, setShowOptions] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newSearchData = { ...searchData, [name]: value };
    setSearchData(newSearchData);
    // Utilise le hook useFormValidation ici pour valider les champs.
  };
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const storedAnnouncements = localStorage.getItem('lastSearchResults');
    const storedTimestamp = localStorage.getItem('lastSearchTimestamp');
    const storedHasSearched = localStorage.getItem('hasSearched');
  
    if (storedHasSearched) {
      setHasSearched(JSON.parse(storedHasSearched));
    }
  
    if (storedAnnouncements && storedTimestamp) {
      const currentTime = Date.now();
      const timeDifference = currentTime - storedTimestamp;
  
      // 86400000 ms = 24 heures
      if (timeDifference < 86400000) {
        setAnnouncements(JSON.parse(storedAnnouncements));
      }
    }
  }, []);
  
  const [hasSearched, setHasSearched] = useState(false);



  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    try {console.log('test',searchData)
      const apiURL = 'http://127.0.0.1:3000/realEstateAd/search';
      const response = await axios.get(apiURL, { params: { ...searchData } });
      setAnnouncements(response.data);
      setHasSearched(true);
      // Stocker les résultats de la recherche et le timestamp
      localStorage.setItem('lastSearchResults', JSON.stringify(response.data));
      localStorage.setItem('lastSearchTimestamp', Date.now());
      localStorage.setItem('hasSearched', JSON.stringify(true));
    } catch (error) {
      console.error('Erreur pendant la récupération des annonces:', error);
    }
  };
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };


  const [carouselItems, setCarouselItems] = useState([]);

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

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const inputValue = searchData.city.trim();
      if (inputValue.length >= 3) {
        try {
          const response = await axios.get(`http://localhost:5000/adresse/search/?q=${inputValue}&type=municipality&additionalField=postalCode`);

          const data = (await response).data;
          console.log("Données brutes de l'API :", data);
          console.log("Premier élément de 'features' :", data.features[0]);
          console.log("Properties du premier élément de 'features':", data.features[0].properties);

          setSuggestions(data.features.map((feature) => ({
            city: feature.properties.city,
            postalCode: feature.properties.postcode // Utilise "postcode" au lieu de "postalCode"
          })));



        } catch (error) {
          console.error('Erreur lors de la récupération des suggestions de villes :', error);
        }
      } else {
        setSuggestions([]);
      }

    };

    fetchSuggestions();
  }, [searchData.city]);
  const handleSuggestionClick = (suggestion) => {
    setSearchData({ ...searchData, city: suggestion.city }); // Met à jour l'input
    setSuggestions([]); // Vide la liste des suggestions
  };
  return (
    <div>{showOptions ? (
      // Affiche SearchPageOption si showOptions est vrai
      <SearchPageOption
        searchData={searchData}
        setSearchDataChange={setSearchData}
        handleChange={handleChange}
        handleSubmit={() => { handleSubmit(); toggleOptions(); }}
        suggestions={suggestions}
        handleSuggestionClick={handleSuggestionClick}
        toggleOptions={toggleOptions}
      />
    ) : (<div>
      <div className="search-bar">
        {/* Input de city avec la liste déroulante de suggestions */}
        <input
          className="auth-form-input"
          type="text"
          name="city"
          placeholder="City"
          id="villeInput"
          value={searchData.city}
          onChange={handleChange}
          list="cities" // Ici on relie l'input à la datalist
          style={{ width: '200px', marginRight: '10px', padding: '8px' }}
        />
        <datalist id="cities">
          {suggestions.map((suggestion, index) => (
            <option key={index} value={suggestion.city}>
              {`(${suggestion.postalCode})`}
            </option>
          ))}
        </datalist>




        {/* Liste déroulante pour le rayon 
        <select value={radius} onChange={handleRadiusChange} style={{ width: '8%', marginRight: '10px' }}>
          <option value="0">0 km</option>
          <option value="5">5 km</option>
          <option value="10">10 km</option>
          <option value="20">20 km</option>
          <option value="50">50 km</option>
        </select>*/}
        {/* Liste déroulante (Select) */}
        <select
          name="propertyType"
          value={searchData.propertyType}
          onChange={handleChange}
          style={{ marginRight: '10px' }}
        >
          <option value="">Type de bien</option>
          <option value="appartement">Appartement</option>
          <option value="maison">Maison / Villa</option>
          <option value="terrain">Terrain</option>
        </select>
        {/* Champ de saisie pour Surface min */}
        <input
          className="auth-form-input"
          type="number"
          name="houseSurface"
          placeholder="Surface min [m²]"
          value={searchData.houseSurface}
          onChange={handleChange}
          style={{ width: '120px', marginRight: '10px', padding: '8px' }}
        />

        {/* Champ de saisie pour Budget max */}
        <input
          className="auth-form-input"
          type="number"
          name="budgetMax"
          placeholder="Budget max [€]"
          value={searchData.budgetMax}
          onChange={handleChange}
          style={{ width: '120px', marginRight: '10px', padding: '8px' }}
        />
        <div>
          {/* Bouton Rechercher */}
          <button className="custom-btn primary-btn me-2" onClick={handleSubmit}>
            Rechercher
          </button>

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



      {hasSearched && (
  <div className="search-results-count">
    Nombre d'annonces correspondantes à votre recherche : {announcements.length}
  </div>
)}

      {/* Affichage des résultats de recherche */}
      <div className="search-results">
  {announcements.map((announcement, index) => (
   <Link
   key={index}
   to={`/detail-annonce/${announcement.id}`}
   className="search-result-item"
   title={announcement.title || 'Titre non disponible'}
 >
   <h3 className="search-result-title">{announcement.title || 'Titre non disponible'}</h3>
   <div className="search-result-content">
     <img
       className="search-result-image"
       src={announcement.images && announcement.images.length > 0 ? `http://127.0.0.1:3000/files/${announcement.images[0]}` : ''}
       alt={announcement.title || 'Titre non disponible'}
     />
     <div className="search-result-details">
       {/* Tes détails ici */}
       <p>Type de bien: {announcement.propertyType || 'Non spécifié'}</p>
       <p>Prix: {announcement.budget ? `${announcement.budget} €` : 'Prix non disponible'}</p>
       <p>Surface: {announcement.houseSurface ? `${announcement.houseSurface} m²` : 'Surface non disponible'}</p>
       <p>Ville: {announcement.city || 'Ville non disponible'}</p>
     </div>
     <div className="search-result-description">
       {/* Ta description ici */}
       <p>
         {(announcement.description ? announcement.description.slice(0, 100) : 'Description non disponible') + (announcement.description?.length > 100 ? "..." : "")}
       </p>
     </div>
   </div>
 </Link>
 
 
  
  ))}
</div>

    </div>

)
        }
    </div>

  
  );

};

export default SearchPage;
