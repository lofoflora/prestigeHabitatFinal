import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function FicheClient({ history }) {
    
  const [client, setClient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedClient, setEditedClient] = useState({});
  const { id: clientId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/client/${clientId}`)
      .then(response => response.json())
      .then(data => {
        setClient(data);
        setEditedClient(data);
      })
      .catch(error => console.error('Erreur lors de la récupération du client:', error));
  }, [clientId]);

  const handleDelete = async () => {
    if (window.confirm('Es-tu sûr de vouloir supprimer ce client ?')) {
      try {
        const response = await axios.delete(`http://localhost:3000/client/${clientId}`);
        if (response.status === 200) {
          alert('Client supprimé avec succès.');
          history.push('/liste-client');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du client:', error);
      }
    }
  };
  

  const handleEdit = () => {
    setEditedClient({ ...client });
    setIsEditing(true);
  };
  

  const handleSave = async () => {
    if (window.confirm('Es-tu sûr de vouloir enregistrer les modifications ?')) {
      try {
        const response = await axios.put(`http://localhost:3000/client/${clientId}`, editedClient);
        if (response.status === 200) {
          alert('Modifications enregistrées avec succès.');
          setIsEditing(false);
          setClient(editedClient);
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du client:', error);
      }
    }
  };
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedClient(prevState => ({ ...prevState, [name]: value }));
  };

  if (!client) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="client-details">
  <h1>Fiche Client</h1>
  {isEditing ? (
    <>
<label>Prénom :</label>
<input name="firstName" value={editedClient.firstName || ""} onChange={handleChange} />

<label>Titre :</label>
<input name="title" value={editedClient.title || ""} onChange={handleChange} />

<label>Nom :</label>
<input name="lastName" value={editedClient.lastName || ""} onChange={handleChange} />

<label>Email :</label>
<input name="email" value={editedClient.email || ""} onChange={handleChange} />

<label>Numéro de téléphone :</label>
<input name="phoneNumber" value={editedClient.phoneNumber || ""} onChange={handleChange} />

<label>Numéro de rue :</label>
<input name="streetNumber" value={editedClient.streetNumber || ""} onChange={handleChange} />

<label>Nom de la rue :</label>
<input name="streetName" value={editedClient.streetName || ""} onChange={handleChange} />

<label>Complément d'adresse :</label>
<input name="adresseComplement" value={editedClient.adresseComplement || ""} onChange={handleChange} />

<label>Ville :</label>
<input name="city" value={editedClient.city || ""} onChange={handleChange} />

<label>Note :</label>
<input name="note" value={editedClient.note || ""} onChange={handleChange} />

<button onClick={handleSave}>Enregistrer</button>

    </>
  ) : (
    <>
      
      <p>Client: {client.title}
      {client.lastName} {client.firstName}</p>
      <p>Email: {client.email}</p>
      <p>Numéro de téléphone: {client.phoneNumber}</p>
      <p>Numéro de rue: {client.streetNumber}</p>
      <p>Nom de la rue: {client.streetName}</p>
      <p>Complément d'adresse: {client.adresseComplement}</p>
      <p>Ville: {client.city}</p>
      <p>Note: {client.note}</p>
      <button onClick={handleEdit}>Modifier</button>
      <button onClick={handleDelete}>Supprimer</button>
    </>
  )}
</div>

  );
}
