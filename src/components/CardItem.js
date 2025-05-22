import React from 'react';

function CardItem({ title, author, image }) {
  return (
    <div className="card h-100">
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Autor: {author}</p>
      </div>
    </div>
  );
}

export default CardItem;