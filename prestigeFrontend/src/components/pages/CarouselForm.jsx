import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SomePage = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: '', description: '' });

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/carousel');
      setCarouselItems(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des éléments du carrousel:', error);
    }
  };

  const handleCarouselSubmit = async () => {
    try {
      await axios.post('/api/carousel/add', newItem);
      fetchItems(); // Recharge la liste
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'élément:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/carousel/remove/${id}`);
      fetchItems(); // Recharge la liste
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'élément:', error);
    }
  };

  useEffect(() => {
    fetchItems();  // Charger les éléments au montage
  }, []);

  return (
    <div>
      <h1>Ma page</h1>
      {/* Formulaire pour ajouter un nouvel élément */}
      <div>
        <input 
          type="text" 
          placeholder="Titre" 
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
        <button onClick={handleCarouselSubmit}>Ajouter</button>
      </div>

      {/* Liste des éléments */}
      <ul>
        {carouselItems.map((item) => (
          <li key={item.id}>
            {item.title} - {item.description}
            <button onClick={() => handleDelete(item.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SomePage;
