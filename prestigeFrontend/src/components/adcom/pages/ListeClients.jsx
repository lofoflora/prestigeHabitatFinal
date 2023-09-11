import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function ListeClients() {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    // Appel API pour récupérer les données
    fetch('http://localhost:3000/client') // Remplace par l'URL de ton API
      .then(response => response.json())
      .then(data => setClients(data))
      .catch(error => console.error('Erreur lors de la récupération des clients:', error));
  }, []);

  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const currentItems = clients.slice(firstItem, lastItem);

  return (
    <div className="client-list">
      <h1>Liste des clients</h1>
      <table className="client-table">
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
