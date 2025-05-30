import React from "react";
import { ImQuotesLeft } from "react-icons/im";
import Card from "./Card";

function About() {
  return (
    <div>
      {/* Hero */}
      <section
        className="jumbotron jumbotron-fluid text-white d-flex align-items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://i.pinimg.com/736x/e2/c9/c6/e2c9c6c3cea38f7d1788592bb41c333b.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: "100px",
          height: "92vh",
        }}
      >
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Acerca De Nosotros</h1>
          <p className="lead">
            MyBlogSite es un espacio para crear, compartir y descubrir historias.
          </p>
          <hr className="border-light mx-auto w-25 border-3 .bg-dark" />
        </div>
      </section>

      {/* Fundador */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Imagen del fundador */}
            <div className="col-md-4 mb-4 mb-md-0">
              <img
                src="https://via.placeholder.com/400x400.png?text=Foto+Fundador"
                alt="Foto del Fundador"
                className="img-fluid rounded shadow-sm"
              />
            </div>
            <div className="col-md-8">
              <h2 className="mb-3">JEREMY CASTELLANOS</h2>
              <ImQuotesLeft />
              <p style={{ textAlign: "justify" }}>
                Estudiante hondureño de 19 años de la carrera de Ingeniería en
                Informática en el Centro Universitario Tecnológico (CEUTEC).
                Apasionado por el desarrollo web, creó el proyecto “MyBlogSite”
                como un espacio donde cada usuario pueda compartir sus ideas y
                experiencias.
              </p>
              <p style={{ letterSpacing: "3px", fontWeight: "bold" }}>
                FUNDADOR
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="mb-4 text-center">Nuestra Historia</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <p>
                MyBlogSite nació en 2025 con la visión de crear una comunidad donde
                las historias de cada persona tuvieran un espacio de expresión
                auténtica. Comenzó como un proyecto personal del fundador, Para que
                los usuarios puedan compartir sus ideas, experiencias y vivencias.
              </p>
              <p>
                A lo largo de las últimas semanas, hemos añadido funcionalidades
                que mejoran la experiencia de blogging: el enfoque principal fue
                ofrecer una experiencia ágil para redactar y publicar entradas sin
                complicaciones. Se creó un editor intuitivo con soporte para texto
                enriquecido, imágenes y enlaces, de modo que cada autor pudiera dar
                vida a sus relatos de forma atractiva. Además, se integró un
                apartado de descubrimiento para que los usuarios pudieran explorar
                las todas las publicaciones que los distintos usuarios del mundo.
              </p>
              <p>
                Hoy, MyBlogSite continúa evolucionando con el mismo espíritu de
                creatividad y conexión. Invitamos a todos a ser parte de esta
                historia: crea tu blog, comparte tus pasiones y descubre las
                narrativas de otros que, como tú, tienen mucho que contar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Misión, Visión y Valores (con 3 cards) */}
      <section
        className="jumbotron jumbotron-fluid text-white d-flex align-items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://img.freepik.com/fotos-premium/concepto-blogueo-blog-web-medios-sociales-red-informacion-comodo_31965-671627.jpg?semt=ais_hybrid&w=740")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: "100px",
          height: "100vh",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            {/* Card 1 */}
            <div className="col-md-4 d-flex justify-content-center mb-4">
              <Card />
            </div>
            {/* Card 2 */}
            <div className="col-md-4 d-flex justify-content-center mb-4">
              <Card />
            </div>
            {/* Card 3 */}
            <div className="col-md-4 d-flex justify-content-center mb-4">
              <Card />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
