import CardItem from "../components/CardItem"
import React, { useState } from 'react';

function Home() {
    const Blogs = [
        {title:'Xbox', author:'Jeremy Castellanos', description:'Información de general de Xbox', publishDate: '2025', image:'https://xboxwire.thesourcemediaassets.com/sites/2/2024/11/New-Xbox-Series-X_S-Console-Options-Family_NoText-65586e62c31bf0eee51f.jpg'},
        {title:'Playstation', author:'Juan Garcia', description:'Información de general de Playstation', publishDate: '2024', image:'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/6162/production/_114403942_ps5.jpg.webp'},
        // {title:'Don Quijote de la Mancha', author:'Miguel de Cervantes', image:'https://www.capsulasliterarias.com/wp-content/webp-express/webp-images/uploads/2023/05/El-Ingenioso-Hidalgo-Don-Quijote-de-la-Mancha-200x300.png.webp'},
        // {title:'1984', author:'George Orwell', image:'https://tunovela.es/wp-content/uploads/712VUvDJGiL-197x300.jpg'},
    ];
      return (
        <div className="container mt-4">
          <h2 style={{paddingBottom: '20px', fontWeight: 'bold'}}>Blogs Disponibles</h2>
          <div className="row">
            {Blogs.map((Blogs, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <CardItem {...Blogs} />
              </div>
            ))}
          </div>
        </div>
      );
}

export default Home;