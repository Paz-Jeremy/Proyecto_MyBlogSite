import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

function BlogInfo({ blogs }) {
    const { id } = useParams(); // extrae de la URL el parámetro :id
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        // Busca el blog con el ID correspondiente
        const found = blogs.find(b => String(b.id) === id);
        if (found) {
            setBlog(found); // Actualiza el estado con el blog encontrado
        }
    }, [id, blogs]); // Se dispara cada vez que cambian id o blogs

    if (!blog) return <p>Cargando...</p>; // Muestra un mensaje mientras se carga el blog

    // Pasas blog.content por DOMPurify para eliminar scripts o etiquetas peligrosas.
    const sanitizedContent = DOMPurify.sanitize(blog.content);

    return (
        <div>
            <section className="container-fluid min-vh-80 py-5" style={{ backgroundColor: "#F4E9CD" }}>
                <div className="row align-items-center h-100 m-4">
                    <div className="col-md-6 mb-4 mb-md-0">
                        <h1 className="display-5 fw-bold text-uppercase">{blog.title}</h1>
                        <hr className="border border-secondary border-1"/>
                        <p className="mb-4 text-muted fst-italic"><b>Descripción:</b> {blog.description}</p>
                        <p className="mb-4">Escrito por: <b>{blog.author}</b></p>
                    </div>
                    <div className="col-md-6">
                        <img src={blog.image_url} alt={blog.title} className="img-fluid rounded" />
                    </div>
                </div>
                <div className="row me-4">
                    <div className="col text-md-end text-center">
                        <small className="text-muted">Fecha de publicación: {new Date(blog.publish_date).toLocaleDateString()}</small>
                    </div>
                </div>
            </section>

            <section className="container my-5">
                {/* Render sanitized HTML content */}
                <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            </section>
        </div>
    );
}

export default BlogInfo;
