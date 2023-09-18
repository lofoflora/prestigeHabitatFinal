import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TableauxDeValidation = () => {
  const [annonces, setAnnonces] = useState([]);
  const [partenaires, setPartenaires] = useState([]);

  const authToken = localStorage.getItem('authToken');

  const validatePartner = async (id) => {
    try {
      const response = await axios.post("http://localhost:3000/validation", { id:id,type:"partner" }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log("Réponse reçue pour la validation du partenaire:", response.data.message);
      setPartenaires(prevPartenaires => prevPartenaires.filter(partenaire => partenaire.id !== id));
    } catch (error) {
      console.error("Erreur lors de la validation du partenaire:", error);
    }
  };

  const validateRealEstateAd = async (id) => {
    try {
      const response = await axios.post("http://localhost:3000/validation", { id:id, type:"realestatead" }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log("Réponse reçue pour la validation de l'annonce immobilière:", response.data.message);
  
      // Mise à jour de la liste des annonces après la validation
      setAnnonces(prevAnnonces => prevAnnonces.filter(annonce => annonce.id !== id));
    } catch (error) {
      console.error("Erreur lors de la validation de l'annonce immobilière:", error);
    }
  };
  

  useEffect(() => {
    const fetchValidations = async () => {
      try {
        const response = await axios.get("http://localhost:3000/validation", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const { annoncesAValider, partenairesAValider } = response.data;
        setAnnonces(annoncesAValider);
        setPartenaires(partenairesAValider);
      } catch (error) {
        console.error("Erreur pendant la récupération des données:", error);
      }
    };

    fetchValidations();
  }, []);
  return (
    <div>
      <h1>Annonces à valider</h1>
      {annonces.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {annonces.map((annonce, index) => (
              <tr key={index}>
                <td>{annonce.title}  {/* Ici c'est title au lieu de titre */}</td>
                <td>
                  <button>
                  <Link to={`/detail-annonce/${annonce.id}`}>Détails</Link>

                  </button>
                  <button onClick={() => validateRealEstateAd(annonce.id)}>Valider</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucune annonce à valider pour le moment.</p>
      )}
  
      <h1>Partenaires à valider</h1>
      {partenaires.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nom du partenaire</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {partenaires.map((partenaire, index) => (
              <tr key={index}>
                <td>{partenaire.entreprise}  {/* Ici c'est entreprise au lieu de nom */}</td>
                <td>
                  <button>Détail</button>
                  <button onClick={() => validatePartner(partenaire.id)}>Valider</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun partenaire à valider pour le moment.</p>
      )}
    </div>
  );
};

export default TableauxDeValidation;
