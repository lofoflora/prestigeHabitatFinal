import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../SearchBar'; // Assure-toi d'avoir le composant SearchBar correctement importé depuis ton projet

export default function ListeVente() {
  const [vente, setVente] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Ajout de l'état du filtre et de la fonction pour mettre à jour le filtre
  const [filter, setFilter] = useState('');
  const [filteredVente, setFilteredVente] = useState(vente);

  // Fonction pour gérer les changements de filtre
  const handleSearch = (searchTerm) => {
    const filtered = vente.filter((vente) =>
      vente.nomDuProjet.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVente(filtered);
    setFilter(searchTerm); // Met à jour le filtre
  };

  useEffect(() => {
    // Appel API pour récupérer les données
    fetch('http://localhost:3000/vente') // Remplace par l'URL de ton API
      .then(response => response.json())
      .then(data => {
        setVente(data);
        setFilteredVente(data); // Initialise filteredVente avec toutes les données
      })
      .catch(error => console.error('Erreur lors de la récupération des vente:', error));
  }, []);

  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const currentItems = filteredVente.slice(firstItem, lastItem); // Utilise filteredVente au lieu de vente

  return (
    <div className="vente-list">
      <h1>Liste des vente</h1>

      {/* Ajout de la barre de recherche */}
      <SearchBar filter={filter} onFilterChange={handleSearch} />

      <table className="vente-table">
        <thead>
          <tr>
            <th>nom du projet</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((vente, index) => (
            <tr key={index}>
              <td>{vente.nomDuProjet}</td>
              <td>
                <Link to={`/fiche-vente/${vente.id}`}>Voir les détails</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
