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

function CardItem({ title, author, description, publishDate, image_url }) {
  return (
    <StyledCard className="card h-100">
      <img 
        src={image_url} 
        alt={title} 
        style={{ width: '100%', height: 'auto' }}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text"><b>Autor:</b> {author}</p>
        <p className="card-text"><b>Descripción:</b> {description}</p>
      </div>
      <p className="card-text text-end" style={{margin: '10px'}}>
          <small className="text-muted">{publishDate}</small>
        </p>
    </StyledCard>
  );
}

export default CardItem;
