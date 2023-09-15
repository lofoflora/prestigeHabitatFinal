import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../SearchBar';
import axios from 'axios';

export default function ListeClients() {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Ajout de l'état du filtre et de la fonction pour mettre à jour le filtre
  const [filter, setFilter] = useState('');
  const [filteredClients, setFilteredClients] = useState(clients);

  // Fonction pour gérer les changements de filtre
  const handleSearch = (searchTerm) => {
    const filtered = clients.filter((client) =>
      `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClients(filtered);
    setFilter(searchTerm); // Met à jour le filtre
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    axios.get('http://localhost:3000/client', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(response => {
      setClients(response.data);
      setFilteredClients(response.data);
    })
    .catch(error => {
      console.error('Erreur:', error);
      // Tu peux aussi mettre à jour l'état pour informer l'utilisateur
    });
  }, []);
  

  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const currentItems = filteredClients.slice(firstItem, lastItem); // Utilise filteredClients au lieu de clients

  return (
    <div className="client-list">
      <h1>Liste des clients</h1>

      {/* Ajout de la barre de recherche */}
      <SearchBar filter={filter} onFilterChange={handleSearch} />

      <table className="client-table" >
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((client, index) => (
            <tr key={index}>
              <td>{client.firstName}</td>
              <td>{client.lastName}</td>
              <td>{client.email}</td>
              <td>
                <Link to={`/fiche-client/${client.id}`}>Voir les détails</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
