import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../SearchBar'; // Assure-toi d'avoir le composant SearchBar correctement importé depuis ton projet

export default function ListeSuiviConstruction() {
  const [suiviConstruction, setSuiviConstruction] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Ajout de l'état du filtre et de la fonction pour mettre à jour le filtre
  const [filter, setFilter] = useState('');
  const [filteredSuiviConstruction, setFilteredSuiviConstruction] = useState(suiviConstruction);

  // Fonction pour gérer les changements de filtre
  const handleSearch = (searchTerm) => {
    const filtered = suiviConstruction.filter((suiviConstruction) =>
      suiviConstruction.nomDuProjet.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSuiviConstruction(filtered);
    setFilter(searchTerm); // Met à jour le filtre
  };

  useEffect(() => {
    // Appel API pour récupérer les données
    fetch('http://localhost:3000/construction') // Remplace par l'URL de ton API
      .then(response => response.json())
      .then(data => {
        setSuiviConstruction(data);
        setFilteredSuiviConstruction(data); // Initialise filteredSuiviConstruction avec toutes les données
      })
      .catch(error => console.error('Erreur lors de la récupération des suiviConstruction:', error));
  }, []);

  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const currentItems = filteredSuiviConstruction.slice(firstItem, lastItem); // Utilise filteredSuiviConstruction au lieu de suiviConstruction

  return (
    <div className="suiviConstruction-list">
      <h1>Liste des suiviConstruction</h1>

      {/* Ajout de la barre de recherche */}
      <SearchBar filter={filter} onFilterChange={handleSearch} />

      <table className="suiviConstruction-table">
        <thead>
          <tr>
            <th>nom du projet</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((suiviConstruction, index) => (
            <tr key={index}>
              <td>{suiviConstruction.nomDuProjet}</td>
              <td>
                <Link to={`/fiche-suiviConstruction/${suiviConstruction.id}`}>Voir les détails</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
