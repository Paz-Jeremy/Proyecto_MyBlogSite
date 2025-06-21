import CardItem from "../components/CardItem";
import React from 'react';
import { Link } from 'react-router-dom';

// Home ahora recibe `blogs` por props
function Home({ blogs }) {
  return (
    <div className="container mt-4">
      <h2 style={{ paddingBottom: '20px', fontWeight: 'bold' }}>Blogs Disponibles</h2>
      <div className="row">
        {blogs.length > 0 ? (
          blogs.map((blog, idx) => {
            // Si 'blog.image' es un File (objeto), creamos un object URL:
            const imageSrc =
              blog.image_url && blog.image_url instanceof File
                ? URL.createObjectURL(blog.image_url)
                : blog.image_url; 
            // De este modo: si 'image' ya venía como string (por ejemplo URL remota),
            // se usa directamente; si es File, crea un URL local.

            return (
              <div className="col-md-4 mb-4" key={blog.id}>
                <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <CardItem
                    title={blog.title}
                    author={blog.author}
                    description={blog.description}
                    publishDate={blog.publish_date}
                    image_url={imageSrc}
                  />
                </Link>
              </div>
            );
          })
        ) : (
          <p>No hay blogs para mostrar.</p>
        )}
      </div>
    </div>
  );
}

export default Home;