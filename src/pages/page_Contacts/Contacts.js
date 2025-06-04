import "./Contacts.css";
import { FaGithub } from "react-icons/fa";
import { IoIosSettings, IoIosClock  } from "react-icons/io";

function Contacts() {

    return(
        <div>
            {/* Inicio */}
            <section
                className="jumbotron jumbotron-fluid text-white d-flex align-items-center"
                style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url("https://img.freepik.com/fotos-premium/mano-tocando-iconos-aplicaciones-moviles_218381-580.jpg?semt=ais_hybrid&w=740")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: "100px",
                height: "92vh",
                }}
            >
                <div className="container text-center">
                <h1 className="display-4 fw-bold">Contáctenos</h1>
                <p className="fw-light">
                    Encuentra aquí toda nuestra información de contacto, incluyendo teléfono, correo electrónico y <br />horario de atención. Estamos aquí para ayudarte con cualquier consulta.
                </p>
                <hr className="border-light mx-auto w-25 border-3" />
                </div>
            </section>
            
            {/* Sección: Ubicación / Soporte / Horario */}
            <section className="py-5" style={{ backgroundColor: "#458188", color: '#eaf6ff' }}>
                <div className="container">
                    <div className="row text-center">
                        {/* Ubicación */}
                        <div className="col-md-4 mb-4">
                            <div className="d-flex flex-column align-items-center">
                                <div
                                    className="rounded-circle d-flex justify-content-center align-items-center mb-3"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        backgroundColor: "#eaf6ff",
                                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    <FaGithub size={28} color="#000" />
                                </div>
                                <h6 className="fw-bold">GITHUB</h6>
                                <p className="mb-0">
                                    <strong>Usuario:</strong> Paz-Jeremy
                                </p>
                            </div>
                        </div>

                        {/* Soporte */}
                        <div className="col-md-4 mb-4">
                            <div className="d-flex flex-column align-items-center">
                                <div
                                    className="rounded-circle d-flex justify-content-center align-items-center mb-3"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        backgroundColor: "#eaf6ff",
                                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    <IoIosSettings size={28} color="#000" />
                                </div>
                                <h6 className="fw-bold">SOPORTE</h6>
                                <p className="mb-1">
                                    <span className="fw-bold">Tel:</span> (+504) 9999-9999
                                </p>
                                <p className="mb-0">
                                <span className="fw-bold">Email: </span>
                                    jeremyjosecastellanos@gmail.com
                                </p>
                            </div>
                        </div>

                        {/* Horario */}
                        <div className="col-md-4 mb-4">
                            <div className="d-flex flex-column align-items-center">
                                <div
                                    className="rounded-circle d-flex justify-content-center align-items-center mb-3"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        backgroundColor: "#eaf6ff",
                                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    <IoIosClock size={28} color="#000" />
                                </div>
                                <h6 className="fw-bold">HORARIO</h6>
                                <p className="mb-1">
                                    <span className="fw-bold">Lunes a viernes:</span> 08:00 – 17:00
                                </p>
                                <p className="mb-0">
                                    <span className="fw-bold">Sábados:</span> 08:00 – 13:30
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Sección de FAQ + Formulario */}
            <section className="py-5" style={{backgroundColor: '#eaf6ff'}}>
                <div className="container">
                <div className="row">
                    {/* Columna de Preguntas Frecuentes */}
                    <div className="col-md-6 mb-4">
                    <h3 className="mb-4">¿Tienes alguna pregunta?</h3>
                    <p>Contáctanos y con gusto resolveremos todas tus dudas.</p>
                    
                    <h6 className="fw-normal">PREGUNTAS FRECUENTES</h6>
                    <div className="accordion" id="faqAccordion" >
                        {/* Pregunta 1 */}
                        <div className="accordion-item" >
                        <h2 className="accordion-header" id="headingOne">
                            <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                            >
                            ¿Qué es MyBlogSite?
                            </button>
                        </h2>
                        <div
                            id="collapseOne"
                            className="accordion-collapse collapse fade show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#faqAccordion"
                        >
                            <div className="accordion-body">
                            MyBlogSite es una plataforma en línea donde cualquier usuario puede crear, publicar y compartir sus propios blogs, así como explorar y leer las publicaciones de otros autores.
                            </div>
                        </div>
                        </div>

                        {/* Pregunta 2 */}
                        <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                            <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                            >
                            ¿Cómo puedo editar o eliminar una publicación que ya creé?
                            </button>
                        </h2>
                        <div
                            id="collapseTwo"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#faqAccordion"
                        >
                            <div className="accordion-body">
                            <ol>
                                <li>Ve al apartado de "Crear Blogs".</li>
                                <li>Busca la publicación que quieres modificar y haz clic en el botón de “Editar”</li>
                                <li>Realiza los cambios en el editor y actualiza. Si deseas eliminarla, elige “Eliminar publicación” en las opciones y confirma la acción.</li>
                            </ol>
                            </div>
                        </div>
                        </div>

                        {/* Pregunta 3 */}
                        <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                            <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                            >
                            ¿MyBlogSite tiene algún costo o suscripción paga?
                            </button>
                        </h2>
                        <div
                            id="collapseThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingThree"
                            data-bs-parent="#faqAccordion"
                        >
                            <div className="accordion-body">
                            La creación de cuenta y la publicación de blogs son totalmente gratuitas. MyBlogSite es un proyecto creado para ayudar a las personas a compartir sus ideas y experiencias sin barreras económicas, fomentando la creatividad y la conexión entre usuarios de todo el mundo.
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* Columna del Formulario de Contacto */}
                    <div className="col-md-6">
                    <hr className="border-black w-25 border-3" />
                    <form>
                        <div className="mb-3">
                        <label htmlFor="inputName" className="form-label">
                            Nombre <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-1"
                            id="inputName"
                            placeholder="Tu nombre"
                            required
                        />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">
                            Email <span className="text-danger">*</span>
                        </label>
                        <input
                            type="email"
                            className="form-control rounded-1"
                            id="inputEmail"
                            placeholder="tu@correo.com"
                            required
                        />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="inputMessage" className="form-label">
                            Comentario o mensaje <span className="text-danger">*</span>
                        </label>
                        <textarea
                            className="form-control rounded-1"
                            id="inputMessage"
                            rows="6"
                            placeholder="Escribe aquí tu mensaje..."
                            required
                        ></textarea>
                        </div>

                        <div className="d-grid gap-2 col-3 mx-auto">
                            <button type="submit" className="btn btn-primary">
                                Enviar
                            </button>
                        </div>
                        
                    </form>
                    </div>
                </div>
                </div>
            </section>
        </div>
    );
}

export default Contacts;