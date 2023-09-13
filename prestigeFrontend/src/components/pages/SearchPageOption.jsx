import React, { useState } from "react";
import SearchPage from "./SearchPage";
import { Link } from 'react-router-dom';

const formatNumberWithSpaces = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};


const SearchPageOption = () => {
  const [localite, setLocalite] = useState("");
  const [adsWithPicture, setAdsWithPicture] = useState(false);
  const [exclusivity, setExclusivity] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [propertyType, setPropertyType] = useState([]);
  const [purchaseType, setPurchaseType] = useState([]);
  const [surfaceMin, setSurfaceMin] = useState("");
  const [surfaceMax, setSurfaceMax] = useState("");
  const [surfaceTerrainMin, setSurfaceTerrainMin] = useState(""); // Assurez-vous que cette variable est définie
  const [surfaceTerrainMax, setSurfaceTerrainMax] = useState("");
  const [numRooms, setNumRooms] = useState([]);
  const [numBedrooms, setNumBedrooms] = useState([]);
  const [numWC, setNumWC] = useState([]);
  const [numBathrooms, setNumBathrooms] = useState([]);
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [heating, setHeating] = useState([]);
  const [amenities, setAmenities] = useState([]);
   // Fonction pour n'accepter que les chiffres dans les champs d'entrée
   const handleKeyPress = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  };

  const handleSelect = (stateName, value) => {
    switch (stateName) {
      case "propertyType":
        setPropertyType((prevState) =>
          prevState.includes(value)
            ? prevState.filter((item) => item !== value)
            : [...prevState, value]
        );
        break;
      case "purchaseType":
        setPurchaseType((prevState) =>
          prevState.includes(value)
            ? prevState.filter((item) => item !== value)
            : [...prevState, value]
        );
        break;
      case "numRooms":
        setNumRooms((prevState) =>
          prevState.includes(value)
            ? prevState.filter((item) => item !== value)
            : [...prevState, value]
        );
        break;
      case "numBedrooms":
        setNumBedrooms((prevState) =>
          prevState.includes(value)
            ? prevState.filter((item) => item !== value)
            : [...prevState, value]
        );
        break;
      case "numWC":
        setNumWC((prevState) =>
          prevState.includes(value)
            ? prevState.filter((item) => item !== value)
            : [...prevState, value]
        );
        break;
      case "numBathrooms":
        setNumBathrooms((prevState) =>
          prevState.includes(value)
            ? prevState.filter((item) => item !== value)
            : [...prevState, value]
        );
        break;
      case "heating":
        setHeating((prevState) =>
          prevState.includes(value)
            ? prevState.filter((item) => item !== value)
            : [...prevState, value]
        );
        break;
      case "amenities":
        setAmenities((prevState) =>
          prevState.includes(value)
            ? prevState.filter((item) => item !== value)
            : [...prevState, value]
        );
        break;
      default:
        break;
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Critères de recherche :", {
      localite,
      adsWithPicture,
      exclusivity,
      favorites,
      propertyType,
      purchaseType,
      surfaceMin,
      surfaceMax,
      numRooms,
      numBedrooms,
      numWC,
      numBathrooms,
      budgetMin,
      budgetMax,
      heating,
      amenities,
    });
  };


  return (
    <div className="container">
      <h1 className="title">Recherche Immobilière</h1>
      
        <form className="auth-form" onSubmit={handleSearch} style={{ width: '80%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
  <label htmlFor="localite" >Localité:</label>
  <input
    type="text"
    id="localite"
    value={localite}
    onChange={(e) => setLocalite(e.target.value)}
    required
    style={{ padding: '5px', height: '25px', width: '40%' }} // Vous pouvez ajuster la valeur de "width" ici
  />
  <div style={{ marginLeft: 'auto' }}>
    <Link to="/search" className="search-button">
      Moins d'options
    </Link>
  </div>
</div>

<div style={{ marginTop: '5px' }}>
  <span className="error">
    Veuillez sélectionner au moins une localité
  </span>
          </div>
          {/* Annonces avec photos */}
          <div className="checkbox-group">
            <label>
              Annonces avec photos:
              <input
                type="checkbox"
                checked={adsWithPicture}
                onChange={() => setAdsWithPicture(!adsWithPicture)}
              />
              <span className="toggle-switch" />
            </label>
          </div>
          {/* Exclusivité */}
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
          {/* Nos coups de coeur */}
          <div className="checkbox-group">
            <label>
              Nos coups de coeur:
              <input
                type="checkbox"
                checked={favorites}
                onChange={() => setFavorites(!favorites)}
              />
              <span className="toggle-switch" />
            </label>
          </div>

          {/* Type de bien */}
            <label>Type de bien:</label>
          <div className="checkbox-group">
            
            <button
              className={propertyType.includes("appartement") ? "selected" : ""}
              onClick={() => handleSelect("propertyType", "appartement")}
            >
              Appartement
            </button>
            <button
              className={propertyType.includes("maison") ? "selected" : ""}
              onClick={() => handleSelect("propertyType", "maison")}
            >
              Maison
            </button>
            <button
              className={propertyType.includes("villa") ? "selected" : ""}
              onClick={() => handleSelect("propertyType", "villa")}
            >
              Villa
            </button>
            <button
              className={propertyType.includes("terrain") ? "selected" : ""}
              onClick={() => handleSelect("propertyType", "terrain")}
            >
              Terrain
            </button>
            <button
              className={propertyType.includes("loft") ? "selected" : ""}
              onClick={() => handleSelect("propertyType", "loft")}
            >
              Loft/Atelier
            </button>
            <button
              className={propertyType.includes("chateau") ? "selected" : ""}
              onClick={() => handleSelect("propertyType", "chateau")}
            >
              Château
            </button>
            <button
              className={propertyType.includes("local") ? "selected" : ""}
              onClick={() => handleSelect("propertyType", "local")}
            >
              Local professionnel
            </button>
            <button
              className={propertyType.includes("commerce") ? "selected" : ""}
              onClick={() => handleSelect("propertyType", "commerce")}
            >
              Commerce
            </button>
            <button
              className={propertyType.includes("garage") ? "selected" : ""}
              onClick={() => handleSelect("propertyType", "garage")}
            >
              Garage/Hangar
            </button>
            <button
              className={propertyType.includes("autre") ? "selected" : ""}
              onClick={() => handleSelect("propertyType", "autre")}
            >
              Autre
            </button>
          </div>
          {/* Type d'achat */}
            <label>Type d'achat:</label>
          <div className="checkbox-group">
            <button
              className={purchaseType.includes("ancien") ? "selected" : ""}
              onClick={() => handleSelect("purchaseType", "ancien")}
            >
              Ancien
            </button>
            <button
              className={purchaseType.includes("neuf") ? "selected" : ""}
              onClick={() => handleSelect("purchaseType", "neuf")}
            >
              Neuf
            </button>
            <button
              className={purchaseType.includes("viager") ? "selected" : ""}
              onClick={() => handleSelect("purchaseType", "viager")}
            >
              Viager
            </button>
            <button
              className={purchaseType.includes("renover") ? "selected" : ""}
              onClick={() => handleSelect("purchaseType", "renover")}
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
          onChange={(e) => setSurfaceMin(e.target.value.replace(/\s/g, ''))}
          onKeyPress={handleKeyPress} // N'accepte que les chiffres
          style={{ padding: '5px', width: '120px', height: '25px', marginRight: '5px', textAlign: 'right' }}
        />
        <span style={{ margin: '0 5px' }}>m²</span>
        <label style={{ marginLeft: '20px', marginRight: '5px' }}>Max:</label>
        <input
          type="text"
          value={formatNumberWithSpaces(surfaceMax)}
          onChange={(e) => setSurfaceMax(e.target.value.replace(/\s/g, ''))}
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
          onChange={(e) => setSurfaceTerrainMin(e.target.value.replace(/\s/g, ''))}
          onKeyPress={handleKeyPress} // N'accepte que les chiffres
          style={{ padding: '5px', width: '120px', height: '25px', marginRight: '5px', textAlign: 'right' }}
        />
        <span style={{ margin: '0 5px' }}>m²</span>
        <label style={{ marginLeft: '20px', marginRight: '5px' }}>Max:</label>
        <input
          type="text"
          value={formatNumberWithSpaces(surfaceTerrainMax)}
          onChange={(e) => setSurfaceTerrainMax(e.target.value.replace(/\s/g, ''))}
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
          onChange={(e) => setBudgetMin(e.target.value.replace(/\s/g, ''))}
          onKeyPress={handleKeyPress} // N'accepte que les chiffres
          style={{ padding: '5px', width: '120px', height: '25px', marginRight: '5px', textAlign: 'right' }}
        />
        <span style={{ margin: '0 5px' }}>€</span>
        <label style={{ marginLeft: '20px', marginRight: '5px' }}>Max:</label>
        <input
          type="text"
          value={formatNumberWithSpaces(budgetMax)}
          onChange={(e) => setBudgetMax(e.target.value.replace(/\s/g, ''))}
          onKeyPress={handleKeyPress} // N'accepte que les chiffres
          style={{ padding: '5px', width: '120px', height: '25px', marginRight: '5px', textAlign: 'right' }}
        />
        <span style={{ margin: '0 5px' }}>€</span>
      </div>
          {/* Nombre de pièces */}
            <label>Nombre de pièce(s):</label>
          <div className="checkbox-group">
            <button
              className={numRooms.includes("1") ? "selected" : ""}
              onClick={() => handleSelect("numRooms", "1")}
            >
              1
            </button>
            <button
              className={numRooms.includes("2") ? "selected" : ""}
              onClick={() => handleSelect("numRooms", "2")}
            >
              2
            </button>
            <button
              className={numRooms.includes("3") ? "selected" : ""}
              onClick={() => handleSelect("numRooms", "3")}
            >
              3
            </button>
            <button
              className={numRooms.includes("4") ? "selected" : ""}
              onClick={() => handleSelect("numRooms", "4")}
            >
              4
            </button>
            <button
              className={numRooms.includes("5+") ? "selected" : ""}
              onClick={() => handleSelect("numRooms", "5+")}
            >
              5+
            </button>
          </div>
          
          {/* Nombre de chambres */}
            <label>Nombre de chambre(s):</label>
          <div className="checkbox-group">
            <button
              className={numBedrooms.includes("1") ? "selected" : ""}
              onClick={() => handleSelect("numBedrooms", "1")}
            >
              1
            </button>
            <button
              className={numBedrooms.includes("2") ? "selected" : ""}
              onClick={() => handleSelect("numBedrooms", "2")}
            >
              2
            </button>
            <button
              className={numBedrooms.includes("3") ? "selected" : ""}
              onClick={() => handleSelect("numBedrooms", "3")}
            >
              3
            </button>
            <button
              className={numBedrooms.includes("4") ? "selected" : ""}
              onClick={() => handleSelect("numBedrooms", "4")}
            >
              4
            </button>
            <button
              className={numBedrooms.includes("5+") ? "selected" : ""}
              onClick={() => handleSelect("numBedrooms", "5+")}
            >
              5+
            </button>
          </div>
          
          {/* Nombre de salles de bain */}
            <label>Nombre de salles de bain :</label>
          <div className="checkbox-group">
            <button
              className={numBathrooms.includes("1") ? "selected" : ""}
              onClick={() => handleSelect("numBathrooms", "1")}
            >
              1
            </button>
            <button
              className={numBathrooms.includes("2") ? "selected" : ""}
              onClick={() => handleSelect("numBathrooms", "2")}
            >
              2
            </button>
            <button
              className={numBathrooms.includes("3+") ? "selected" : ""}
              onClick={() => handleSelect("numBathrooms", "3+")}
            >
              3+
            </button>
          </div>

          {/* Nombre de WC */}
            <label>Nombre de WC :</label>
          <div className="checkbox-group">
            <button
              className={numWC.includes("1") ? "selected" : ""}
              onClick={() => handleSelect("numWC", "1")}
            >
              1
            </button>
            <button
              className={numWC.includes("2") ? "selected" : ""}
              onClick={() => handleSelect("numWC", "2")}
            >
              2
            </button>
            <button
              className={numWC.includes("3+") ? "selected" : ""}
              onClick={() => handleSelect("numWC", "3+")}
            >
              3+
            </button>
          </div>

          {/* Chauffage */}
            <label>Chauffage:</label>
          <div className="checkbox-group">
            <button
              className={heating.includes("electrique") ? "selected" : ""}
              onClick={() => handleSelect("heating", "electrique")}
            >
              Electrique
            </button>
            <button
              className={heating.includes("gaz") ? "selected" : ""}
              onClick={() => handleSelect("heating", "gaz")}
            >
              Gaz
            </button>
            <button
              className={heating.includes("fioul") ? "selected" : ""}
              onClick={() => handleSelect("heating", "fioul")}
            >
              Fioul
            </button>
            <button
              className={heating.includes("bois") ? "selected" : ""}
              onClick={() => handleSelect("heating", "bois")}
            >
              Bois
            </button>
            <button
              className={heating.includes("autre") ? "selected" : ""}
              onClick={() => handleSelect("heating", "autre")}
            >
              Autre
            </button>
          </div>

          {/* Commodités */}
            <label>Commodités/Confort:</label>
          <div className="checkbox-group">
            <button
              className={amenities.includes("piscine") ? "selected" : ""}
              onClick={() => handleSelect("amenities", "piscine")}
            >
            Jardin
          </button>
          <button
            className={amenities.includes("ascenseur") ? "selected" : ""}
            onClick={() => handleSelect("amenities", "ascenseur")}
          >
            Garage
          </button>
          <button
            className={amenities.includes("jardin") ? "selected" : ""}
            onClick={() => handleSelect("amenities", "jardin")}
          >
              Piscine
            </button>
            <button
              className={amenities.includes("garage") ? "selected" : ""}
              onClick={() => handleSelect("amenities", "garage")}
            >
              Ascenseur
            </button>
            <button
              className={amenities.includes("balcon") ? "selected" : ""}
              onClick={() => handleSelect("amenities", "balcon")}
            >
              Balcon
            </button>
            <button
              className={amenities.includes("cave") ? "selected" : ""}
              onClick={() => handleSelect("amenities", "cave")}
            >
              Cave
            </button>
            <button
              className={amenities.includes("terrasse") ? "selected" : ""}
              onClick={() => handleSelect("amenities", "terrasse")}
            >
              Terrasse
            </button>
            <button
              className={amenities.includes("pompe a chaleur") ? "selected" : ""}
              onClick={() => handleSelect("amenities", "pompe a chaleur")}
            >
              Pompe à chaleur
            </button>
            <button
              className={amenities.includes("climatisation") ? "selected" : ""}
              onClick={() => handleSelect("amenities", "climatisation")}
            >
              Climatisation
            </button>
            <button
              className={amenities.includes("Panneaux solaires") ? "selected" : ""}
              onClick={() => handleSelect("amenities", "Panneaux solaires")}
            >
              Panneaux solaires
            </button>
            <button
              className={amenities.includes("autre") ? "selected" : ""}
              onClick={() => handleSelect("amenities", "autre")}
            >
              Autre
            </button>
          </div> <br />
          <div style={{ textAlign: 'center' }}>
  <button className="search-button" onClick={handleSearch} style={{ margin: 'auto' }}>
    Rechercher
  </button>
</div>

        </form>
      </div>
   
  );
};

export default SearchPageOption;
