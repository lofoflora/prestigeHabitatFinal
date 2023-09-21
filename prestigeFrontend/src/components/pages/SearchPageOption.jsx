import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const formatNumberWithSpaces = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const SearchPageOption = ({ searchData, setSearchDataChange, handleSubmit, suggestions,handleChange, handleSuggestionClick,toggleOptions }) => {
  useEffect(() => {
    setSearchDataChange(searchData);
  }, [searchData]);

  const {
    city, propertyType, purchaseType, houseSurface, landSurface, numRooms, numBedrooms, numWC,
    numBathrooms, budget, heating, amenities, actif, surfaceMin, surfaceMax, surfaceTerrainMax, surfaceTerrainMin, budgetMin,
    budgetMax,
  } = searchData;

  const handleselect = (name, value) => {
    if (name === "city") {
      setSearchDataChange((prevData) => ({
        ...prevData,
        [name]: value, // Mettre à jour la valeur de "city" directement
      }));
    } else if (["propertyType", "purchaseType", "numRooms", "numBedrooms", "numWC", "numBathrooms", "heating", "amenities"].includes(name)) {
      // Gestion des états de tableau
      const updatedValues = searchData[name].includes(value)
        ? searchData[name].filter((item) => item !== value)
        : [...searchData[name], value];
  
      setSearchDataChange((prevData) => ({
        ...prevData,
        [name]: updatedValues,
      }));
    }
  };
  const handleInputChange = (name, value) => {
    setSearchDataChange((prevData) => ({
      ...prevData,
      [name]: value, // Supprimer les espaces
    }));
  };

  const handleSearch = () => {
    onSearchDataChange(searchData);
  };

  // Fonction pour n'accepter que les chiffres dans les champs d'entrée
  const handleKeyPress = (event, name) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    } else {
      // Mettre à jour la valeur du champ spécifié avec le bon format (par exemple, en supprimant les espaces pour les chiffres)
      const inputValue = event.target.value;
      handleselect(name, inputValue);
    }
  };
  

  const navigate = useNavigate();

  const goToSomePage = () => {
    navigate('/somePage');
  };

 
  //const [exclusivity, setExclusivity] = useState(false);


  return (
    <div className="container">
      <h1 className="title">Recherche Immobilière</h1>
      
        <form className="auth-form" onSubmit={handleSearch} style={{ width: '80%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="city">Localité:</label>
        <input 
        className="auth-form-input"
        type="text"
        name="city"
        placeholder="City"
        id="villeInput"
        value={searchData.city}
        onChange={handleChange}
        list="cities"
        style={{ width: '200px', marginRight: '10px', padding: '8px' }}
      />
      <datalist id="cities">
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion.city} onClick={() => handleSuggestionClick(suggestion)}>
            {`(${suggestion.postalCode})`}
          </option>
        ))}
      </datalist>

  <div style={{ marginLeft: 'auto' }}>
    <Link to="/search" className="search-button"onClick={toggleOptions}>
      Moins d'options
    </Link>
  </div>
</div>

<div style={{ marginTop: '5px' }}>
  <span className="error">
    Veuillez sélectionner au moins une localité
  </span>
          </div>
          
          {/* Exclusivité
          <div className="checkbox-group">
            <label>
              Exclusivité:
              <input
                type="checkbox"
                checked={exclusivity}
                onChange={() => setExclusivity(!exclusivity)}
              />
              <span className="toggle-switch" />
            </label>
          </div>
           */}

          {/* Type de bien */}
            <label>Type de bien:</label>
          <div className="checkbox-group">
            
            <button type="button"
              className={propertyType.includes("appartement") ? "selected" : ""}
              onClick={() => handleselect("propertyType", "appartement")}
            >
              Appartement
            </button>
            <button type="button"
              className={propertyType.includes("maison") ? "selected" : ""}
              onClick={() => handleselect("propertyType", "maison")}
            >
              Maison
            </button>
            <button type="button"
              className={propertyType.includes("villa") ? "selected" : ""}
              onClick={() => handleselect("propertyType", "villa")}
            >
              Villa
            </button>
            <button type="button"
              className={propertyType.includes("terrain") ? "selected" : ""}
              onClick={() => handleselect("propertyType", "terrain")}
            >
              Terrain
            </button>
            <button type="button"
              className={propertyType.includes("loft") ? "selected" : ""}
              onClick={() => handleselect("propertyType", "loft")}
            >
              Loft/Atelier
            </button>
            <button type="button"
              className={propertyType.includes("chateau") ? "selected" : ""}
              onClick={() => handleselect("propertyType", "chateau")}
            >
              Château
            </button>
            <button type="button"
              className={propertyType.includes("local") ? "selected" : ""}
              onClick={() => handleselect("propertyType", "local")}
            >
              Local professionnel
            </button>
            <button type="button"
              className={propertyType.includes("commerce") ? "selected" : ""}
              onClick={() => handleselect("propertyType", "commerce")}
            >
              Commerce
            </button>
            <button type="button"
              className={propertyType.includes("garage") ? "selected" : ""}
              onClick={() => handleselect("propertyType", "garage")}
            >
              Garage/Hangar
            </button>
            <button type="button"
              className={propertyType.includes("autre") ? "selected" : ""}
              onClick={() => handleselect("propertyType", "autre")}
            >
              Autre
            </button>
          </div>
          {/* Type d'achat */}
            <label>Type d'achat:</label>
          <div className="checkbox-group">
            <button type="button"
              className={purchaseType.includes("ancien") ? "selected" : ""}
              onClick={() => handleselect("purchaseType", "ancien")}
            >
              Ancien
            </button>
            <button type="button"
              className={purchaseType.includes("neuf") ? "selected" : ""}
              onClick={() => handleselect("purchaseType", "neuf")}
            >
              Neuf
            </button>
            <button type="button"
              className={purchaseType.includes("viager") ? "selected" : ""}
              onClick={() => handleselect("purchaseType", "viager")}
            >
              Viager
            </button>
            <button type="button"
              className={purchaseType.includes("renover") ? "selected" : ""}
              onClick={() => handleselect("purchaseType", "renover")}
            >
              A rénover
            </button>
          </div>
          {/* Surface */}
<label style={{ marginRight: '10px' }}>Surface:</label>
<div style={{ display: 'flex', alignItems: 'center' }}>
  <label style={{ marginRight: '5px' }}>Min:</label>
  <input
  type="text"
  value={formatNumberWithSpaces(surfaceMin)}
  onChange={(e) => handleInputChange('surfaceMin', e.target.value)}
  onKeyPress={(e) => handleKeyPress(e, "surfaceMin")} // N'accepte que les chiffres
  style={{ padding: '5px', width: '120px', height: '25px', marginRight: '5px', textAlign: 'right' }}
/>
  <span style={{ margin: '0 5px' }}>m²</span>
  <label style={{ marginLeft: '20px', marginRight: '5px' }}>Max:</label>
  <input
    type="text"
    value={formatNumberWithSpaces(surfaceMax)}
    onChange={(e) => handleInputChange("surfaceMax", e.target.value)}
    onKeyPress={handleKeyPress} // N'accepte que les chiffres
    style={{ padding: '5px', width: '120px', height: '25px', marginRight: '5px', textAlign: 'right' }}
  />
  <span style={{ margin: '0 5px' }}>m²</span>
</div>

{/* Surface du terrain */}
<label style={{ marginRight: '10px', marginTop: '10px' }}>Surface du terrain:</label>
<div style={{ display: 'flex', alignItems: 'center' }}>
  <label style={{ marginRight: '5px' }}>Min:</label>
  <input
    type="text"
    value={formatNumberWithSpaces(surfaceTerrainMin)}
    onChange={(e) => handleInputChange("surfaceTerrainMin", e.target.value)}
    onKeyPress={handleKeyPress} // N'accepte que les chiffres
    style={{ padding: '5px', width: '120px', height: '25px', marginRight: '5px', textAlign: 'right' }}
  />
  <span style={{ margin: '0 5px' }}>m²</span>
  <label style={{ marginLeft: '20px', marginRight: '5px' }}>Max:</label>
  <input
    type="text"
    value={formatNumberWithSpaces(surfaceTerrainMax)}
    onChange={(e) => handleInputChange("surfaceTerrainMax", e.target.value)}
    onKeyPress={handleKeyPress} // N'accepte que les chiffres
    style={{ padding: '5px', width: '120px', height: '25px', marginRight: '5px', textAlign: 'right' }}
  />
  <span style={{ margin: '0 5px' }}>m²</span>
</div>

{/* Budget */}
<label style={{ marginRight: '10px', marginTop: '10px' }}>Budget:</label>
<div style={{ display: 'flex', alignItems: 'center' }}>
  <label style={{ marginRight: '5px' }}>Min:</label>
  <input
    type="text"
    value={formatNumberWithSpaces(budgetMin)}
    onChange={(e) => handleInputChange("budgetMin", e.target.value)}
    onKeyPress={handleKeyPress} // N'accepte que les chiffres
    style={{ padding: '5px', width: '120px', height: '25px', marginRight: '5px', textAlign: 'right' }}
  />
  <span style={{ margin: '0 5px' }}>€</span>
  <label style={{ marginLeft: '20px', marginRight: '5px' }}>Max:</label>
  <input
    type="text"
    value={formatNumberWithSpaces(budgetMax)}
    onChange={(e) => handleInputChange("budgetMax", e.target.value)}
    onKeyPress={handleKeyPress} // N'accepte que les chiffres
    style={{ padding: '5px', width: '120px', height: '25px', marginRight: '5px', textAlign: 'right' }}
  />
  <span style={{ margin: '0 5px' }}>€</span>
</div>

          {/* Nombre de pièces */}
            <label>Nombre de pièce(s):</label>
          <div className="checkbox-group">
            <button type="button"
              className={numRooms.includes("1") ? "selected" : ""}
              onClick={() => handleselect("numRooms", "1")}
            >
              1
            </button>
            <button type="button"
              className={numRooms.includes("2") ? "selected" : ""}
              onClick={() => handleselect("numRooms", "2")}
            >
              2
            </button>
            <button type="button"
              className={numRooms.includes("3") ? "selected" : ""}
              onClick={() => handleselect("numRooms", "3")}
            >
              3
            </button>
            <button type="button"
              className={numRooms.includes("4") ? "selected" : ""}
              onClick={() => handleselect("numRooms", "4")}
            >
              4
            </button>
            <button type="button"
              className={numRooms.includes("5+") ? "selected" : ""}
              onClick={() => handleselect("numRooms", "5+")}
            >
              5+
            </button>
          </div>
          
          {/* Nombre de chambres */}
            <label>Nombre de chambre(s):</label>
          <div className="checkbox-group">
            <button type="button"
              className={numBedrooms.includes("1") ? "selected" : ""}
              onClick={() => handleselect("numBedrooms", "1")}
            >
              1
            </button>
            <button type="button"
              className={numBedrooms.includes("2") ? "selected" : ""}
              onClick={() => handleselect("numBedrooms", "2")}
            >
              2
            </button>
            <button type="button"
              className={numBedrooms.includes("3") ? "selected" : ""}
              onClick={() => handleselect("numBedrooms", "3")}
            >
              3
            </button>
            <button type="button"
              className={numBedrooms.includes("4") ? "selected" : ""}
              onClick={() => handleselect("numBedrooms", "4")}
            >
              4
            </button>
            <button type="button"
              className={numBedrooms.includes("5+") ? "selected" : ""}
              onClick={() => handleselect("numBedrooms", "5+")}
            >
              5+
            </button>
          </div>
          
          {/* Nombre de salles de bain */}
            <label>Nombre de salles de bain :</label>
          <div className="checkbox-group">
            <button type="button"
              className={numBathrooms.includes("1") ? "selected" : ""}
              onClick={() => handleselect("numBathrooms", "1")}
            >
              1
            </button>
            <button type="button"
              className={numBathrooms.includes("2") ? "selected" : ""}
              onClick={() => handleselect("numBathrooms", "2")}
            >
              2
            </button>
            <button type="button"
              className={numBathrooms.includes("3+") ? "selected" : ""}
              onClick={() => handleselect("numBathrooms", "3+")}
            >
              3+
            </button>
          </div>

          {/* Nombre de WC */}
            <label>Nombre de WC :</label>
          <div className="checkbox-group">
            <button type="button"
              className={numWC.includes("1") ? "selected" : ""}
              onClick={() => handleselect("numWC", "1")}
            >
              1
            </button>
            <button type="button"
              className={numWC.includes("2") ? "selected" : ""}
              onClick={() => handleselect("numWC", "2")}
            >
              2
            </button>
            <button type="button"
              className={numWC.includes("3+") ? "selected" : ""}
              onClick={() => handleselect("numWC", "3+")}
            >
              3+
            </button>
          </div>

          {/* Chauffage */}
            <label>Chauffage:</label>
          <div className="checkbox-group">
            <button type="button"
              className={heating.includes("electrique") ? "selected" : ""}
              onClick={() => handleselect("heating", "electrique")}
            >
              Electrique
            </button>
            <button type="button"
              className={heating.includes("gaz") ? "selected" : ""}
              onClick={() => handleselect("heating", "gaz")}
            >
              Gaz
            </button>
            <button type="button"
              className={heating.includes("fioul") ? "selected" : ""}
              onClick={() => handleselect("heating", "fioul")}
            >
              Fioul
            </button>
            <button type="button"
              className={heating.includes("bois") ? "selected" : ""}
              onClick={() => handleselect("heating", "bois")}
            >
              Bois
            </button>
            <button type="button"
              className={heating.includes("autre") ? "selected" : ""}
              onClick={() => handleselect("heating", "autre")}
            >
              Autre
            </button>
          </div>

          {/* Commodités */}
            <label>Commodités/Confort:</label>
          <div className="checkbox-group">
            <button type="button"
              className={amenities.includes("piscine") ? "selected" : ""}
              onClick={() => handleselect("amenities", "piscine")}
            >
            Jardin
          </button>
          <button type="button"
            className={amenities.includes("ascenseur") ? "selected" : ""}
            onClick={() => handleselect("amenities", "ascenseur")}
          >
            Garage
          </button>
          <button type="button"
            className={amenities.includes("jardin") ? "selected" : ""}
            onClick={() => handleselect("amenities", "jardin")}
          >
              Piscine
            </button>
            <button type="button"
              className={amenities.includes("garage") ? "selected" : ""}
              onClick={() => handleselect("amenities", "garage")}
            >
              Ascenseur
            </button>
            <button type="button"
              className={amenities.includes("balcon") ? "selected" : ""}
              onClick={() => handleselect("amenities", "balcon")}
            >
              Balcon
            </button>
            <button type="button"
              className={amenities.includes("cave") ? "selected" : ""}
              onClick={() => handleselect("amenities", "cave")}
            >
              Cave
            </button>
            <button type="button"
              className={amenities.includes("terrasse") ? "selected" : ""}
              onClick={() => handleselect("amenities", "terrasse")}
            >
              Terrasse
            </button>
            <button type="button"
              className={amenities.includes("pompe a chaleur") ? "selected" : ""}
              onClick={() => handleselect("amenities", "pompe a chaleur")}
            >
              Pompe à chaleur
            </button>
            <button type="button"
              className={amenities.includes("climatisation") ? "selected" : ""}
              onClick={() => handleselect("amenities", "climatisation")}
            >
              Climatisation
            </button>
            <button type="button"
              className={amenities.includes("Panneaux solaires") ? "selected" : ""}
              onClick={() => handleselect("amenities", "Panneaux solaires")}
            >
              Panneaux solaires
            </button>
            <button type="button"
              className={amenities.includes("autre") ? "selected" : ""}
              onClick={() => handleselect("amenities", "autre")}
            >
              Autre
            </button>
          </div> <br />
          <div style={{ textAlign: 'center' }}>
          <button type="button" onClick={handleSubmit}>Rechercher</button>

</div>

        </form>
      </div>
  
  )};

export default SearchPageOption;
