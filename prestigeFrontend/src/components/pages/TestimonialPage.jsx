import React, { useState } from 'react';


const Star = ({ selected = false, onSelect = f => f }) => (
  <span className="star" onClick={onSelect}>{selected ? '★' : '☆'}</span>
);

const StarRating = ({ totalStars }) => {
  const [starsSelected, selectStar] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((n, i) => (
        <Star key={i} selected={i < starsSelected} onSelect={() => selectStar(i + 1)} />
      ))}
      <p>
        {starsSelected} sur {totalStars} étoiles
      </p>
    </div>
  );
};

const TestimonialForm = () => {
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <form>
      <StarRating totalStars={5} />
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Votre commentaire" />
      <input type="file" onChange={handleImageChange} />
      {image && <img src={image} alt="Uploaded" />}
      <button type="submit">Soumettre</button>
    </form>
  );
};

const TestimonialPage = () => (
  <div>
    <h1>Page de Témoignage</h1>
    <TestimonialForm />
  </div>
);

export default TestimonialPage;
