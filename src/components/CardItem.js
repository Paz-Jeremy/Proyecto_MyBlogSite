import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  box-shadow: 0 0 8px 0 #0006;
  transition: box-shadow 0.1s ease;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    box-shadow: 0 0 18px 0 #0006;
    transform: scale(0.98);
  }
`;

function CardItem({ title, author, image }) {
  return (
    <StyledCard className="card h-100">
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Autor: {author}</p>
      </div>
    </StyledCard>
  );
}

export default CardItem;
