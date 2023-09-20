import React, { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';





const formatNumberWithSpaces = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};



const SearchPageOption = ({ searchData, onSearchDataChange }) => {
  const [localSearchData, setLocalSearchData] = useState(searchData);

  useEffect(() => {
    setLocalSearchData(searchData);
  }, [searchData]);
  console.log("Props searchData:", searchData);

  // const handleChange = (name, value) => {
  //   const updatedSearchData = { ...localSearchData, [name]: value };
  //   setLocalSearchData(updatedSearchData);
  // };
  const handleChange = (name, value) => {
    if (["propertyType", "purchaseType", "numRooms", "numBedrooms", "numWC", "numBathrooms", "heating", "amenities"].includes(name)) {
      // Gestion des états de tableau
      setState((prevState) => {
        return prevState.includes(value)
          ? prevState.filter((item) => item !== value)
          : [...prevState, value];
      });
    } else {
      // Gestion des états simples
      const updatedSearchData = { ...localSearchData, [name]: value };
      setLocalSearchData(updatedSearchData);
    }
  };
  
  const handleSearch = () => {
    onSearchDataChange(localSearchData);
  };

   // Fonction pour n'accepter que les chiffres dans les champs d'entrée
   const handleKeyPress = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  };
  const navigate = useNavigate();

  const goToSomePage = () => {
    navigate('/somePage');
  };

  const [city, setCity] = useState("");
const [adsWithPicture, setAdsWithPicture] = useState(false);
const [exclusivity, setExclusivity] = useState(false);


  // const handleChange = (stateName, value) => {
  //   switch (stateName) {
  //     case "propertyType":
  //       setPropertyType((prevState) =>
  //         prevState.includes(value)
  //           ? prevState.filter((item) => item !== value)
  //           : [...prevState, value]
  //       );
  //       break;
  //     case "purchaseType":
  //       setPurchaseType((prevState) =>
  //         prevState.includes(value)
  //           ? prevState.filter((item) => item !== value)
  //           : [...prevState, value]
  //       );
  //       break;
  //     case "numRooms":
  //       setNumRooms((prevState) =>
  //         prevState.includes(value)
  //           ? prevState.filter((item) => item !== value)
  //           : [...prevState, value]
  //       );
  //       break;
  //     case "numBedrooms":
  //       setNumBedrooms((prevState) =>
  //         prevState.includes(value)
  //           ? prevState.filter((item) => item !== value)
  //           : [...prevState, value]
  //       );
  //       break;
  //     case "numWC":
  //       setNumWC((prevState) =>
  //         prevState.includes(value)
  //           ? prevState.filter((item) => item !== value)
  //           : [...prevState, value]
  //       );
  //       break;
  //     case "numBathrooms":
  //       setNumBathrooms((prevState) =>
  //         prevState.includes(value)
  //           ? prevState.filter((item) => item !== value)
  //           : [...prevState, value]
  //       );
  //       break;
  //     case "heating":
  //       setHeating((prevState) =>
  //         prevState.includes(value)
  //           ? prevState.filter((item) => item !== value)
  //           : [...prevState, value]
  //       );
  //       break;
  //     case "amenities":
  //       setAmenities((prevState) =>
  //         prevState.includes(value)
  //           ? prevState.filter((item) => item !== value)
  //           : [...prevState, value]
  //       );
  //       break;
  //     default:
  //       break;
  //   }
  // };
  

  return (
    <div className="container">
      <h1 className="title">Recherche Immobilière</h1>
      
        <form className="auth-form" onSubmit={handleSearch} style={{ width: '80%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
  <label htmlFor="city" >Localité:</label>
  <input
    type="text"
    id="city"
    value={city}
    onChange={(e) => handleChange("city", e.target.value)}
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
          

          {/* Type de bien */}
            <label>Type de bien:</label>
          <div className="checkbox-group">
            
            <button
              className={propertyType.includes("appartement") ? "selected" : ""}
              onClick={() => handleChange("propertyType", "appartement")}
            >
              Appartement
            </button>
            <button
              className={propertyType.includes("maison") ? "selected" : ""}
              onClick={() => handleChange("propertyType", "maison")}
            >
              Maison
            </button>
            <button
              className={propertyType.includes("villa") ? "selected" : ""}
              onClick={() => handleChange("propertyType", "villa")}
            >
              Villa
            </button>
            <button
              className={propertyType.includes("terrain") ? "selected" : ""}
              onClick={() => handleChange("propertyType", "terrain")}
            >
              Terrain
            </button>
            <button
              className={propertyType.includes("loft") ? "selected" : ""}
              onClick={() => handleChange("propertyType", "loft")}
            >
              Loft/Atelier
            </button>
            <button
              className={propertyType.includes("chateau") ? "selected" : ""}
              onClick={() => handleChange("propertyType", "chateau")}
            >
              Château
            </button>
            <button
              className={propertyType.includes("local") ? "selected" : ""}
              onClick={() => handleChange("propertyType", "local")}
            >
              Local professionnel
            </button>
            <button
              className={propertyType.includes("commerce") ? "selected" : ""}
              onClick={() => handleChange("propertyType", "commerce")}
            >
              Commerce
            </button>
            <button
              className={propertyType.includes("garage") ? "selected" : ""}
              onClick={() => handleChange("propertyType", "garage")}
            >
              Garage/Hangar
            </button>
            <button
              className={propertyType.includes("autre") ? "selected" : ""}
              onClick={() => handleChange("propertyType", "autre")}
            >
              Autre
            </button>
          </div>
          {/* Type d'achat */}
            <label>Type d'achat:</label>
          <div className="checkbox-group">
            <button
              className={purchaseType.includes("ancien") ? "selected" : ""}
              onClick={() => handleChange("purchaseType", "ancien")}
            >
              Ancien
            </button>
            <button
              className={purchaseType.includes("neuf") ? "selected" : ""}
              onClick={() => handleChange("purchaseType", "neuf")}
            >
              Neuf
            </button>
            <button
              className={purchaseType.includes("viager") ? "selected" : ""}
              onClick={() => handleChange("purchaseType", "viager")}
            >
              Viager
            </button>
            <button
              className={purchaseType.includes("renover") ? "selected" : ""}
              onClick={() => handleChange("purchaseType", "renover")}
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
              onClick={() => handleChange("numRooms", "1")}
            >
              1
            </button>
            <button
              className={numRooms.includes("2") ? "selected" : ""}
              onClick={() => handleChange("numRooms", "2")}
            >
              2
            </button>
            <button
              className={numRooms.includes("3") ? "selected" : ""}
              onClick={() => handleChange("numRooms", "3")}
            >
              3
            </button>
            <button
              className={numRooms.includes("4") ? "selected" : ""}
              onClick={() => handleChange("numRooms", "4")}
            >
              4
            </button>
            <button
              className={numRooms.includes("5+") ? "selected" : ""}
              onClick={() => handleChange("numRooms", "5+")}
            >
              5+
            </button>
          </div>
          
          {/* Nombre de chambres */}
            <label>Nombre de chambre(s):</label>
          <div className="checkbox-group">
            <button
              className={numBedrooms.includes("1") ? "selected" : ""}
              onClick={() => handleChange("numBedrooms", "1")}
            >
              1
            </button>
            <button
              className={numBedrooms.includes("2") ? "selected" : ""}
              onClick={() => handleChange("numBedrooms", "2")}
            >
              2
            </button>
            <button
              className={numBedrooms.includes("3") ? "selected" : ""}
              onClick={() => handleChange("numBedrooms", "3")}
            >
              3
            </button>
            <button
              className={numBedrooms.includes("4") ? "selected" : ""}
              onClick={() => handleChange("numBedrooms", "4")}
            >
              4
            </button>
            <button
              className={numBedrooms.includes("5+") ? "selected" : ""}
              onClick={() => handleChange("numBedrooms", "5+")}
            >
              5+
            </button>
          </div>
          
          {/* Nombre de salles de bain */}
            <label>Nombre de salles de bain :</label>
          <div className="checkbox-group">
            <button
              className={numBathrooms.includes("1") ? "selected" : ""}
              onClick={() => handleChange("numBathrooms", "1")}
            >
              1
            </button>
            <button
              className={numBathrooms.includes("2") ? "selected" : ""}
              onClick={() => handleChange("numBathrooms", "2")}
            >
              2
            </button>
            <button
              className={numBathrooms.includes("3+") ? "selected" : ""}
              onClick={() => handleChange("numBathrooms", "3+")}
            >
              3+
            </button>
          </div>

          {/* Nombre de WC */}
            <label>Nombre de WC :</label>
          <div className="checkbox-group">
            <button
              className={numWC.includes("1") ? "selected" : ""}
              onClick={() => handleChange("numWC", "1")}
            >
              1
            </button>
            <button
              className={numWC.includes("2") ? "selected" : ""}
              onClick={() => handleChange("numWC", "2")}
            >
              2
            </button>
            <button
              className={numWC.includes("3+") ? "selected" : ""}
              onClick={() => handleChange("numWC", "3+")}
            >
              3+
            </button>
          </div>

          {/* Chauffage */}
            <label>Chauffage:</label>
          <div className="checkbox-group">
            <button
              className={heating.includes("electrique") ? "selected" : ""}
              onClick={() => handleChange("heating", "electrique")}
            >
              Electrique
            </button>
            <button
              className={heating.includes("gaz") ? "selected" : ""}
              onClick={() => handleChange("heating", "gaz")}
            >
              Gaz
            </button>
            <button
              className={heating.includes("fioul") ? "selected" : ""}
              onClick={() => handleChange("heating", "fioul")}
            >
              Fioul
            </button>
            <button
              className={heating.includes("bois") ? "selected" : ""}
              onClick={() => handleChange("heating", "bois")}
            >
              Bois
            </button>
            <button
              className={heating.includes("autre") ? "selected" : ""}
              onClick={() => handleChange("heating", "autre")}
            >
              Autre
            </button>
          </div>

          {/* Commodités */}
            <label>Commodités/Confort:</label>
          <div className="checkbox-group">
            <button
              className={amenities.includes("piscine") ? "selected" : ""}
              onClick={() => handleChange("amenities", "piscine")}
            >
            Jardin
          </button>
          <button
            className={amenities.includes("ascenseur") ? "selected" : ""}
            onClick={() => handleChange("amenities", "ascenseur")}
          >
            Garage
          </button>
          <button
            className={amenities.includes("jardin") ? "selected" : ""}
            onClick={() => handleChange("amenities", "jardin")}
          >
              Piscine
            </button>
            <button
              className={amenities.includes("garage") ? "selected" : ""}
              onClick={() => handleChange("amenities", "garage")}
            >
              Ascenseur
            </button>
            <button
              className={amenities.includes("balcon") ? "selected" : ""}
              onClick={() => handleChange("amenities", "balcon")}
            >
              Balcon
            </button>
            <button
              className={amenities.includes("cave") ? "selected" : ""}
              onClick={() => handleChange("amenities", "cave")}
            >
              Cave
            </button>
            <button
              className={amenities.includes("terrasse") ? "selected" : ""}
              onClick={() => handleChange("amenities", "terrasse")}
            >
              Terrasse
            </button>
            <button
              className={amenities.includes("pompe a chaleur") ? "selected" : ""}
              onClick={() => handleChange("amenities", "pompe a chaleur")}
            >
              Pompe à chaleur
            </button>
            <button
              className={amenities.includes("climatisation") ? "selected" : ""}
              onClick={() => handleChange("amenities", "climatisation")}
            >
              Climatisation
            </button>
            <button
              className={amenities.includes("Panneaux solaires") ? "selected" : ""}
              onClick={() => handleChange("amenities", "Panneaux solaires")}
            >
              Panneaux solaires
            </button>
            <button
              className={amenities.includes("autre") ? "selected" : ""}
              onClick={() => handleChange("amenities", "autre")}
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
