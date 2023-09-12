import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../SearchBar'; // Assure-toi d'avoir le composant SearchBar correctement importé depuis ton projet

export default function ListeAmo() {
  const [amo, setAmo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Ajout de l'état du filtre et de la fonction pour mettre à jour le filtre
  const [filter, setFilter] = useState('');
  const [filteredAmo, setFilteredAmo] = useState(amo);

  // Fonction pour gérer les changements de filtre
  const handleSearch = (searchTerm) => {
    const filtered = amo.filter((amo) =>
      amo.nomDuProjet.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAmo(filtered);
    setFilter(searchTerm); // Met à jour le filtre
  };

  useEffect(() => {
    // Appel API pour récupérer les données
    fetch('http://localhost:3000/Amo') // Remplace par l'URL de ton API
      .then(response => response.json())
      .then(data => {
        setAmo(data);
        setFilteredAmo(data); // Initialise filteredAmo avec toutes les données
      })
      .catch(error => console.error('Erreur lors de la récupération des amo:', error));
  }, []);

  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const currentItems = filteredAmo.slice(firstItem, lastItem); // Utilise filteredAmo au lieu de amo

  return (
    <div className="amo-list">
      <h1>Liste des amo</h1>

      {/* Ajout de la barre de recherche */}
      <SearchBar filter={filter} onFilterChange={handleSearch} />

      <table className="amo-table">
        <thead>
          <tr>
            <th>nom du projet</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((amo, index) => (
            <tr key={index}>
              <td>{amo.nomDuProjet}</td>
              <td>
                <Link to={`/fiche-amo/${amo.id}`}>Voir les détails</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
