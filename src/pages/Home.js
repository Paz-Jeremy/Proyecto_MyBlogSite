import CardItem from "../components/CardItem"
import React, { useState } from 'react';

function Home() {
    const Blogs = [
        {title:'El Principito', author:'Antoine de Saint-Exupéry', image:'https://www.editorialsaid.cl/wp-content/uploads/2024/08/El-Principito-Antoine-de-Saint-Exupery_1-600x842.jpg'},
        {title:'Cien años de soledad', author:'Gabriel García Márquez', image:'https://tunovela.es/wp-content/uploads/Cien-anos-de-soledad-de-Gabriel-Garcia-Marquez-resumen-y-analisis-197x300.jpg'},
        {title:'Don Quijote de la Mancha', author:'Miguel de Cervantes', image:'https://www.capsulasliterarias.com/wp-content/webp-express/webp-images/uploads/2023/05/El-Ingenioso-Hidalgo-Don-Quijote-de-la-Mancha-200x300.png.webp'},
        {title:'1984', author:'George Orwell', image:'https://tunovela.es/wp-content/uploads/712VUvDJGiL-197x300.jpg'},
    ];
      return (
        <div className="container mt-4">
          <h2>Blogs Disponibles</h2>
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