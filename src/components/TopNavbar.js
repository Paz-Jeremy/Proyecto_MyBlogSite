import React from 'react';
import { useNavigate } from 'react-router-dom';

function TopNavbar() {
    const navigate = useNavigate();

    return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#031926' }}>
            <div className="container" style={{ width: '15%' }}>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <button className="nav-link" href="#" onClick={() => navigate('/')}>
                            <img
                            src="https://previews.dropbox.com/p/thumb/ACorqtHE0hGpSOp_xkHXPQ3Eo8PWcghTYE1IzS_lt3W8YTp1xbpdUqtcScyct59ujUd_ru1GqYuJy5bvayfsECe7vIvivTgrnZD4FYFmaZWdesvqn1dqhm9cXIFal9kXJW6-9-qC042GKxo9KUHb8nMj5yHlb1mvLdaZ0tWs5SLHKJ7CaT2I-k3J9HnsfnJvqfMoNQa_kczfBHKD-Rc05_xfLMAuKi_7rXmcEu8qf305AFj_nAvGpfJMMaQGlAHEdoU9RooqzxHCMNiwwbqQDWdTqIx8scKMbdP5JhBjYX7GyBTPO9XZWeYEJ3lx-K3DDcLofwr1pRPQPOp_VixMtLHT/p.png"
                            alt="Logo MyBlogSite"
                            width="130"
                            />
                        </button>
                    </li>
                </ul>
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