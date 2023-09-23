import React from 'react';


function Home() {
  return (
  
    <div className="home-container">
      <br />
      <h2 className="home-heading">Bienvenue chez Nous - Votre Partenaire Immobilier de Confiance</h2>
      {/* Contenu de la page d'accueil */}
      <section className="home-section">
      <hr style={{ borderColor: '#ffd700', borderWidth: '3px', margin: '10px auto', width: '85%' }} />


<div className='textelarge'>
        <p>
          Chez <strong className='textPrestige'>Prestige Habitat</strong>, 
          nous sommes bien plus qu'une simple agence immobilière. 
          Nous sommes votre partenaire de confiance pour réaliser vos projets immobiliers, des plus simples aux plus fous
        </p>
        <br />
      {/* Carrousel Bootstrap */}
      <div id="homeCarousel" className="carousel slide m-0 p-0" data-bs-ride="carousel">


        <div className="carousel-inner">
          <div className="carousel-item">
            <img src="public/photo_acceuil/abbaye-senanque-rangees-fleuries-fleurs-lavande-vue-panoramique_268835-861.jpg" className="d-block w-100" alt="Image 2"style={{ height: '400px', width: '100%' }}  />
          </div>
          <div className="carousel-item">
        <img 
  src="public/photo_acceuil/vue-aerienne-ville-avignon-france_78361-11812.jpg" 
  className="d-block w-100" 
  style={{ height: '400px', width: '100%' }} 
/>
</div>
          <div className="carousel-item active">
            <img src="public/photo_acceuil/construction-europeenne-repere-vue-etroit_1203-4984.jpg" className="d-block w-100" alt="Image 1"style={{ height: '400px', width: '100%' }}  />
          </div>
          <div className="carousel-item">
            <img src="public/photo_acceuil/paysage-village_1182-840.jpg" className="d-block w-100" alt="Image 2"style={{ height: '400px', width: '100%' }}  />
          </div>
          {/* Ajoute d'autres images de la même manière */}
        </div>
      </div>

      <br />
        <p>
          En tant qu'experts de l'<span className='text-bold-italic-underline'>Assistance à Maîtrise d'Ouvrage (AMO)</span>,
           nous avons l'habitude de dépasser les attentes de nos clients. Nous ne sommes pas des constructeurs, 
           mais notre expertise nous permet de vous accompagner avec passion et professionnalisme
            dans chaque étape de votre projet immobilier, y compris la construction.
        </p>
        <br />
        <p>
          Vous avez un projet de vente ou d'achat ? Nous vous proposons une approche personnalisée
           pour vous aider à trouver la meilleure opportunité sur le marché. Vous souhaitez investir
            dans l'immobilier ? Notre équipe qualifiée vous guide vers les meilleures
             options d'investissement pour optimiser votre retour sur investissement.
        </p>
        <br />
        <p>
          Mais ce n'est pas tout ! Nous croyons en la puissance des partenariats.
           Grâce à notre réseau trié sur le volet, nous collaborons avec des professionnels de l'immobilier,
            des architectes et des entrepreneurs pour vous offrir un service complet et sur mesure.
             Vos rêves deviennent réalité avec <strong className='textPrestige'>Prestige Habitat</strong>.
        </p>
        <br />
        <p>
          Alors, laissez-nous être votre guide dans le monde de l'immobilier.
           Contactez-nous dès aujourd'hui pour une consultation gratuite et 
           découvrez comment nous pouvons transformer vos projets immobiliers en succès éclatants !
        </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
