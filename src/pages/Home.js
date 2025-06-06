import CardItem from "../components/CardItem";
import React from 'react';

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
              blog.image && blog.image instanceof File
                ? URL.createObjectURL(blog.image)
                : blog.image; 
            // De este modo: si 'image' ya venía como string (por ejemplo URL remota),
            // se usa directamente; si es File, crea un URL local.

            return (
              <div className="col-md-4 mb-4" key={idx}>
                <CardItem
                  title={blog.title}
                  author={blog.author}
                  description={blog.description}
                  publishDate={blog.publishDate}
                  image={imageSrc}
                />
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