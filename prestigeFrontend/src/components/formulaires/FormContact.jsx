import React, { useState } from 'react';
import axios from 'axios';

function ContactForm() {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        commentaire: '',
        contactPreference: '',
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Données du formulaire:", formData); // Log pour vérifier les données du formulaire
      
        try {
          const response = await axios.post('http://localhost:3000/contact', formData);
          if (response.status === 200) {
            console.log('Mail envoyé avec succès');
            // Ici, tu peux ajouter du code pour réinitialiser le formulaire ou naviguer vers une autre page, etc.
          }
        } catch (error) {
          console.log('Erreur lors de l\'envoi du mail', error);
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        }
      };
  
  
  return (
    <div>
      <h2>Contactez-nous</h2>
      <form onSubmit={handleSubmit}> 
    <label>Nom:</label>
    <input type="text" name="nom" onChange={handleChange} />
    
    <label>Prénom:</label>
    <input type="text" name="prenom" onChange={handleChange} />
    
    <label>Adresse Email:</label>
    <input type="email" name="email" onChange={handleChange} />
    
    <label>Téléphone:</label>
    <input type="tel" name="telephone" onChange={handleChange} />
    
    <label>Commentaire:</label>
    <textarea name="commentaire" onChange={handleChange}></textarea>
    
    <label>Préférence de contact:</label>
    <input type="radio" id="email" name="contactPreference" value="Email" onChange={handleChange} />
    <label htmlFor="email">Email</label>
    
    <input type="radio" id="telephone" name="contactPreference" value="Téléphone" onChange={handleChange} />
    <label htmlFor="telephone">Téléphone</label>
    
    <button type="submit">Envoyer</button>
  </form>
    </div>
  );
}

export default ContactForm;
