import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../SearchBar';
import axios from 'axios';


export default function ListePartner() {
  const [partners, setPartner] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Ajout de l'état du filtre et de la fonction pour mettre à jour le filtre
  const [filter, setFilter] = useState('');
  const [filteredPartner, setFilteredPartner] = useState(partners);

  // Fonction pour gérer les changements de filtre
  const handleSearch = (searchTerm) => {
    const filtered = partners.filter((partner) =>
      `${partner.firstName} ${partner.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPartner(filtered);
    setFilter(searchTerm); // Met à jour le filtre
  };



  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    axios.get('http://localhost:3000/partner', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(response => {
      setPartner(response.data);
      setFilteredPartner(response.data);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des partners:', error);
      // Tu peux aussi mettre à jour l'état pour informer l'utilisateur
    });
  }, []);
  
  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const currentItems = filteredPartner.slice(firstItem, lastItem); // Utilise filteredPartner au lieu de partners

  return (
    <div className="partner-list">
      <h1>Liste des partners</h1>

      {/* Ajout de la barre de recherche */}
      <SearchBar filter={filter} onFilterChange={handleSearch} />

      <table className="partner-table">
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((partner, index) => (
            <tr key={index}>
              <td>{partner.firstName}</td>
              <td>{partner.lastName}</td>
              <td>{partner.email}</td>
              <td>
                <Link to={`/fiche-partner/${partner.id}`}>Voir les détails</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
