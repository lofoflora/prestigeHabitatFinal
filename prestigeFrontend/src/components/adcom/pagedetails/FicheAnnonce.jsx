import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RealEstateAdFiche({ adId: propAdId }) {
    const [adDetails, setAdDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedAd, setEditedAd] = useState({ ...adDetails, heating: [] });

    const textAreaRef = useRef(null);

    const { id: routeAdId } = useParams();
    const finalAdId = propAdId || routeAdId;

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        console.log('Token d\'authentification:', authToken);
        console.log('finalAdId:', finalAdId);

        const fetchData = async () => {
            try {
                console.log('Début de la requête Axios');
                const response = await axios.get(`http://127.0.0.1:3000/realEstateAd/${finalAdId}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                console.log('Réponse de la requête Axios:', response);

                // Vérification et mise à jour de heating
                if (!response.data.heating) {
                    response.data.heating = [];
                }

                // Vérification et mise à jour de amenities
                if (!response.data.amenities) {
                    response.data.amenities = [];
                }

                setAdDetails(response.data);
                setEditedAd(response.data); // Initialise editedAd avec les données de l'annonce
            } catch (error) {
                console.log('Erreur lors de la récupération de l\'annonce:', error);
            }
        };

        if (finalAdId) {
            fetchData();
        }
    }, [finalAdId]);



    const handleChange = (e) => {
        setEditedAd({
            ...editedAd,
            [e.target.name]: e.target.value,
        });
    };


    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            // Remplace ceci avec ton API pour mettre à jour l'annonce
            await axios.put(`http://127.0.0.1:3000/realEstateAd/${adDetails.id}`, editedAd);
            setIsEditing(false);
        } catch (error) {
            console.error("Une erreur est survenue lors de la mise à jour.", error);
        }
    };

    const handleDelete = async () => {
        try {
            // Remplace ceci avec ton API pour supprimer l'annonce
            await axios.delete(`http://127.0.0.1:3000/realEstateAd/${adDetails.id}`);
            // Faire quelque chose pour retirer l'annonce de la liste ou naviguer ailleurs
        } catch (error) {
            console.error("Une erreur est survenue lors de la suppression.", error);
        }
    };

    if (!adDetails) {
        return <p>Chargement...</p>;
    }
    const toggleHeating = (type) => {
        const updatedHeating = [...editedAd.heating];

        if (updatedHeating.includes(type)) {
            updatedHeating.splice(updatedHeating.indexOf(type), 1);
        } else {
            updatedHeating.push(type);
        }

        setEditedAd({ ...editedAd, heating: updatedHeating });
    };
    const toggleAmenity = (type) => {
        const updatedAmenity = [...editedAd.amenities];

        if (updatedAmenity.includes(type)) {
            updatedAmenity.splice(updatedAmenity.indexOf(type), 1);
        } else {
            updatedAmenity.push(type);
        }

        setEditedAd({ ...editedAd, amenities: updatedAmenity });
    };
    const handleTextareaChange = (event) => {
        setEditedAd({
            ...editedAd,
            [event.target.name]: event.target.value,
        });
    };

    const handleTextChange = (event) => {
        // Votre logique de traitement du changement de texte ici
    };

    return (
        <div className="ad-details">
            <h1>Fiche Annonce</h1>
            {isEditing ? (
                <form onSubmit={handleSave}>
                    <h1>Création d'annonce immobilière</h1>
                    <br />
                    <br />

                    {/* Informations de base */}
                    <h5>Adresse</h5>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label>
                            N° :
                            <input
                                type="text"
                                name="streetNumber"
                                value={editedAd.streetNumber || ""}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Voie/Rue/Chemin :
                            <input
                                type="text"
                                name="streetName"
                                value={editedAd.streetName || ""}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <label>
                        Complément d'adresse :
                        <input
                            type="text"
                            name="adressComplement"
                            value={editedAd.adressComplement || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Code Postal :
                        <input
                            type="text"
                            name="postalCode"
                            value={editedAd.postalCode || ""}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Ville :
                        <input type="text" name="city" value={editedAd.city || ""} readOnly />
                    </label>

                    {/* Bien à vendre */}
                    <h5>Bien à vendre</h5>

                    <label>Titre de l'annonce:</label>
                    <input
                        type="text"
                        name="title"
                        value={editedAd.title || ""}
                        onChange={handleChange}
                        required
                    />

                    {/* Type de propriété */}
                    <label>Type de propriété :</label>
                    <div className="radio-group">
                        {[
                            "Appartement",
                            "Maison",
                            "Studio",
                            "Terrain",
                            "Loft/atelier",
                            "Chateau",
                            "Local professionnel",
                            "Commerce",
                            "Garage/Hangar",
                            "Autre",
                        ].map((type) => (
                            <label key={type}>
                                <input
                                    type="radio"
                                    name="propertyType"
                                    value={type}
                                    checked={editedAd.propertyType === type}
                                    onChange={handleChange}
                                />
                                {type}
                            </label>
                        ))}
                    </div>

                    <label>Type de vente :</label>
                    <div className="radio-group">
                        {["Ancien", "Neuf", "Viager", "A rénover"].map((type) => (
                            <label key={type}>
                                <input
                                    type="radio"
                                    name="purchaseType"
                                    value={type}
                                    checked={editedAd.purchaseType === type}
                                    onChange={handleChange}
                                />
                                {type}
                            </label>
                        ))}
                    </div>

                    {/* Surface de la maison */}
                    <label>Surface de la maison:</label>
                    <input
                        type="text"
                        name="houseSurface"
                        value={editedAd.houseSurface || ""}
                        onChange={handleChange}
                    />

                    {/* Surface du terrain */}
                    <label>Surface du terrain:</label>
                    <input
                        type="text"
                        name="landSurface"
                        value={editedAd.landSurface || ""}
                        onChange={handleChange}
                    />

                    {/* Nombre de pièces */}
                    <label>Nombre de pièces:</label>
                    <input
                        type="number"
                        name="numRooms"
                        value={editedAd.numRooms || ""}
                        onChange={handleChange}
                    />

                    {/* Nombre de chambres */}
                    <label>Nombre de chambres:</label>
                    <input
                        type="number"
                        name="numBedrooms"
                        value={editedAd.numBedrooms || ""}
                        onChange={handleChange}
                    />

                    {/* Nombre de WC */}
                    <label>Nombre de WC:</label>
                    <input
                        type="number"
                        name="numWC"
                        value={editedAd.numWC || ""}
                        onChange={handleChange}
                    />

                    {/* Nombre de salles de bain */}
                    <label>Nombre de salles de bain:</label>
                    <input
                        type="number"
                        name="numBathrooms"
                        value={editedAd.numBathrooms || ""}
                        onChange={handleChange}
                    />

                    {/* Budget */}
                    <label>Budget:</label>
                    <input
                        type="text"
                        name="budget"
                        value={editedAd.budget || ""}
                        onChange={handleChange}
                    />

                    {/* Chauffage */}
                    <label>Chauffage:</label>
                    <div className="checkbox-group">
                        {["Electrique", "Gaz", "Fioul", "Bois", "Autre"].map((type) => (
                            <button
                                key={type}
                                type="button"
                                className={editedAd.heating && editedAd.heating.includes(type) ? "selected" : ""}
                                onClick={() => toggleHeating(type)}
                            >
                                {type}
                            </button>
                        ))}
                    </div>


                    {/* Commodités */}
                    <label>Commodités:</label>
                    <div className="checkbox-group">
                        {[
                            "Jardin",
                            "Garage",
                            "Piscine",
                            "Ascenseur",
                            "Balcon",
                            "Cave",
                            "Terrasse",
                            "Pompe à chaleur",
                            "Climatisation",
                            "Panneaux solaires",
                            "Autre",
                        ].map((type) => (
                            <button
                                key={type}
                                type="button"
                                className={editedAd.amenities && editedAd.amenities.includes(type) ? "selected" : ""}
                                onClick={() => toggleAmenity(type)}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <div>
                        <label>Description</label>
                        <textarea
                            ref={textAreaRef}
                            placeholder="Description"
                            name="description"
                            value={editedAd.description || ""}
                            onChange={handleTextareaChange}
                            onInput={handleTextChange}
                        ></textarea>
                    </div>

                     {/* <div>
            <label>Photo</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
            />
          </div>

          <div>
            <label>Vue 3D</label>
            <input
              type="file"
              accept=".obj,.gltf"
              multiple
              onChange={handleThreeDUpload}
            />
          </div>  */}

                    <button type="submit">Enregistrer</button>
                </form>
            ) : (
                <>
                    <h1>Titre</h1>
                    <p>{adDetails.title}</p>
                    <p>Type de bien: {adDetails.propertyType}</p>
                    <p>Type d'achat: {adDetails.purchaseType}</p>
                    <p>Budget: {adDetails.budget}</p>
                    <h2>Description</h2>
                    <div style={{ border: '1px solid black', padding: '15px', borderRadius: '5px' }}>
                        <p>{adDetails.description}</p>
                    </div>

                    <h2>Caractéristiques</h2>
                    <p>Surface de la maison: {adDetails.houseSurface} m²</p>
                    <p>Surface du terrain: {adDetails.landSurface} m²</p>
                    <p>Nombre de pièces: {adDetails.numRooms}</p>
                    <p>Nombre de chambres: {adDetails.numBedrooms}</p>
                    <p>Nombre de WC: {adDetails.numWC}</p>
                    <p>Nombre de salles de bain: {adDetails.numBathrooms}</p>
                    <p>Chauffage: {adDetails.heating.join(', ')}</p>
                    <p>Équipements: {adDetails.amenities.join(', ')}</p>


                    <h2>Adresse du bien</h2>
                    <p>{adDetails.streetNumber} {adDetails.streetName}</p>
                    <p>{adDetails.adressComplement}</p>
                    <p>{adDetails.postalCode}, {adDetails.city}</p>
                    <button onClick={handleEdit}>Modifier</button>
                    <button onClick={handleDelete}>Supprimer</button>
                </>
            )}
        </div>
    );
};

export default RealEstateAdFiche;
