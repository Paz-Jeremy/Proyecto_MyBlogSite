import React from 'react';
import { useNavigate } from 'react-router-dom';

function TopNavbar() {
    const navigate = useNavigate();

    return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#031926' }}>
            <div className="container" style={{ width: '10%' }}>
                <a className="navbar-brand" href="#">
                    <img
                    src="https://i.pinimg.com/1200x/8e/a6/02/8ea6024e4ce1dbaeb8629e4c12ee328b.jpg"
                    alt="Logo MyBlogSite"
                    width="50"
                    height="40"
                    />


                </a>
            </div>
            <div className="container-fluid">

                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <button
                            className="nav-link"
                            onClick={() => navigate('/')}
                            style={{ transition: 'font-size 0.1s ease' }}
                            onMouseEnter={(e) => e.target.style.fontSize = '1.20rem'} // tamaño más grande
                            onMouseLeave={(e) => e.target.style.fontSize = '1rem'} // tamaño normal
                        >
                            Home
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className="nav-link"
                            onClick={() => navigate('/about')}
                            style={{ transition: 'font-size 0.1s ease' }}
                            onMouseEnter={(e) => e.target.style.fontSize = '1.15rem'}
                            onMouseLeave={(e) => e.target.style.fontSize = '1rem'}
                        >
                            Acerca de
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className="nav-link"
                            onClick={() => navigate('/contacts')}
                            style={{ transition: 'font-size 0.1s ease' }}
                            onMouseEnter={(e) => e.target.style.fontSize = '1.15rem'}
                            onMouseLeave={(e) => e.target.style.fontSize = '1rem'}
                        >
                            Contactos
                        </button>
                    </li>
                </ul>



                <div className="dropdown">
                    <button className="btn bg-light dropdown-toggle" data-bs-toggle="dropdown">
                        Usuario
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><button className="dropdown-item" onClick={() => navigate('/perfil')}>Perfil</button></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item" onClick={() => navigate('/blogs')}>Crear blogs</button></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default TopNavbar;