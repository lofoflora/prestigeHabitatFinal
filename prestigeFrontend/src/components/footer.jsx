import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="container-fluid bg-dark text-white py-3">
      <div className="container">

        <div className="row justify-content-between">
          <div className="col-4 text-start">
      <h5 className="text-start mb-4">Prestige Habitat</h5>
            <p>123 Rue Fictive, Ville Imaginaire</p>
            <p>Téléphone : +00 123 456 789</p>
            <Link to="/contact">Contactez-nous</Link>
          </div>

          <div className="col-4 text-start"><br />
            <Link to="/qui-sommes-nous">Qui sommes-nous</Link><br /><br />
            <Link to="/nos-valeurs">Nos valeurs</Link><br /><br />
            <Link to="/cgu">CGU</Link>
          </div>

          <div className="col-4 text-end"><br />
            <h5>Suivez-nous sur :</h5><br />
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} className="me-3" size="2x" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className="me-3" size="2x" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
