import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function FichePartenaire({ history }) {
  console.log("Rendering FichePartenaire");
  const [partner, setPartner] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPartner, setEditedPartner] = useState({});
  const { id: partnerId } = useParams();

  useEffect(() => {
    console.log("Fetching partner data...");
    fetch(`http://localhost:3000/partner/${partnerId}`)
      .then(response => {
        console.log("API Response: ", response);
        return response.json();
      })
      .then(data => {
        console.log("Partner Data: ", data);
        setPartner(data);
        setEditedPartner(data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du partenaire:', error);
      });
  }, [partnerId]);

  const handleDelete = async () => {
    if (window.confirm('Es-tu sûr de vouloir supprimer ce partenaire ?')) {
      try {
        const response = await axios.delete(`http://localhost:3000/partner/${partnerId}`);
        if (response.status === 200) {
          alert('Partenaire supprimé avec succès.');
          history.push('/liste-partenaire');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du partenaire:', error);
      }
    }
  };

  const handleEdit = () => {
    console.log("Is editing:", isEditing);
    setEditedPartner({ ...partner });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (window.confirm('Es-tu sûr de vouloir enregistrer les modifications ?')) {
      try {
        const response = await axios.put(`http://localhost:3000/partner/${partnerId}`, editedPartner);
        if (response.status === 200) {
          alert('Modifications enregistrées avec succès.');
          setIsEditing(false);
          setPartner(editedPartner);
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du partenaire:', error);
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPartner(prevState => ({ ...prevState, [name]: value }));
  };

  if (!partner) {
    return <div>Chargement...</div>;
  }

      return (
        <div className="partner-details">
          <h1>Fiche Partenaire</h1>
          
{isEditing ? (
  <>
    <label>Entreprise :</label>
    <input name="entreprise" value={editedPartner.entreprise || ""} onChange={handleChange} />

    <label>Titre :</label>
    <input name="title" value={editedPartner.title || ""} onChange={handleChange} />

    <label>Prénom :</label>
    <input name="firstName" value={editedPartner.firstName || ""} onChange={handleChange} />

    <label>Nom :</label>
    <input name="lastName" value={editedPartner.lastName || ""} onChange={handleChange} />

    <label>Email :</label>
    <input name="email" value={editedPartner.email || ""} onChange={handleChange} />

    <label>Numéro de téléphone :</label>
    <input name="phoneNumber" value={editedPartner.phoneNumber || ""} onChange={handleChange} />

    <label>Numéro de rue :</label>
    <input name="streetNumber" value={editedPartner.streetNumber || ""} onChange={handleChange} />

    <label>Nom de la rue :</label>
    <input name="streetName" value={editedPartner.streetName || ""} onChange={handleChange} />

    <label>Complément d'adresse :</label>
    <input name="adresseComplement" value={editedPartner.adresseComplement || ""} onChange={handleChange} />

    <label>Ville :</label>
    <input name="city" value={editedPartner.city || ""} onChange={handleChange} />

    <label>Note :</label>
    <input name="note" value={editedPartner.note || ""} onChange={handleChange} />

    <label>SIRET :</label>
    <input name="siret" value={editedPartner.siret || ""} onChange={handleChange} />

    <button onClick={handleSave}>Enregistrer</button>
  </>
) : (
  <>
    <p>Entreprise: {partner.entreprise}</p>
    <p>Titre: {partner.title}</p>
    <p>Prénom: {partner.firstName}</p>
    <p>Nom: {partner.lastName}</p>
    <p>Email: {partner.email}</p>
    <p>Numéro de téléphone: {partner.phoneNumber}</p>
    <p>Numéro de rue: {partner.streetNumber}</p>
    <p>Nom de la rue: {partner.streetName}</p>
    <p>Complément d'adresse: {partner.adresseComplement}</p>
    <p>Ville: {partner.city}</p>
    <p>Note: {partner.note}</p>
    <p>SIRET: {partner.siret}</p>
    <button onClick={handleEdit}>Modifier</button>
    <button onClick={handleDelete}>Supprimer</button>
  </>
)}

        </div>
      );
    };
  