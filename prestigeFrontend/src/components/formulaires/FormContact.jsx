import React, { useState } from 'react';
import axios from 'axios';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Récupère l'ID de l'annonce depuis le localStorage
    const annonceId = localStorage.getItem('annonceId'); // Remplace 'annonceId' par la clé exacte que tu utilises pour stocker l'ID dans le localStorage
  
    // Vérifie si l'ID est bien récupéré
    if (!annonceId) {
      console.log('ID de l\'annonce non trouvé dans le localStorage');
      return;
    }
  
    // Ajoute l'ID de l'annonce à formData
    const completeFormData = { ...formData, annonceId };
  
    try {
      const response = await axios.post('http://localhost:3000/contact', completeFormData);
      if (response.status === 200) {
        console.log('Mail envoyé avec succès');
        // Ici, tu peux ajouter du code pour réinitialiser le formulaire ou naviguer vers une autre page, etc.
      }
    } catch (error) {
      console.log('Erreur lors de l\'envoi du mail', error);
      // Ici, tu peux gérer les erreurs, par exemple en affichant un message à l'utilisateur.
    }
  };
  
  return (
    <div>
      <h2>Contactez-nous</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="subject">Objet :</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message :</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default ContactForm;
