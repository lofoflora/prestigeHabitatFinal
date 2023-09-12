import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../SearchBar'; // Assure-toi d'avoir le composant SearchBar correctement importé depuis ton projet

export default function ListeAchatRevente() {
  const [achatRevente, setAchatRevente] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Ajout de l'état du filtre et de la fonction pour mettre à jour le filtre
  const [filter, setFilter] = useState('');
  const [filteredAchatRevente, setFilteredAchatRevente] = useState(achatRevente);

  // Fonction pour gérer les changements de filtre
  const handleSearch = (searchTerm) => {
    const filtered = achatRevente.filter((achatRevente) =>
      achatRevente.nomDuProjet.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAchatRevente(filtered);
    setFilter(searchTerm); // Met à jour le filtre
  };

  useEffect(() => {
    // Appel API pour récupérer les données
    fetch('http://localhost:3000/AchatRevente') // Remplace par l'URL de ton API
      .then(response => response.json())
      .then(data => {
        setAchatRevente(data);
        setFilteredAchatRevente(data); // Initialise filteredAchatRevente avec toutes les données
      })
      .catch(error => console.error('Erreur lors de la récupération des achatRevente:', error));
  }, []);

  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const currentItems = filteredAchatRevente.slice(firstItem, lastItem); // Utilise filteredAchatRevente au lieu de achatRevente

  return (
    <div className="achatRevente-list">
      <h1>Liste des achatRevente</h1>

      {/* Ajout de la barre de recherche */}
      <SearchBar filter={filter} onFilterChange={handleSearch} />

      <table className="achatRevente-table">
        <thead>
          <tr>
            <th>nom du projet</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((achatRevente, index) => (
            <tr key={index}>
              <td>{achatRevente.nomDuProjet}</td>
              <td>
                <Link to={`/fiche-achatRevente/${achatRevente.id}`}>Voir les détails</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
