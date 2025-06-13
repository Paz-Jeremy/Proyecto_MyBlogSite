import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import './TopNavbar.css';

function TopNavbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Intenta obtener el usuario desde localStorage
        const localUser = localStorage.getItem('user');
        if (localUser) {
            setUser(JSON.parse(localUser));
        } else {
            // Si no hay en localStorage, intenta obtenerlo desde Supabase
            supabase.auth.getUser().then(({ data }) => {
                if (data?.user) {
                    setUser(data.user);
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
            });
        }
    }, []);

    // Puedes personalizar el nombre y avatar según la estructura de tu usuario
    const userName = user?.user_metadata?.name || user?.email || 'Usuario';
    const userAvatar = user?.user_metadata?.avatar_url;

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
                            onMouseEnter={(e) => e.target.style.fontSize = '1.20rem'}
                            onMouseLeave={(e) => e.target.style.fontSize = '1rem'}
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

                {/* Si el usuario está autenticado, muestra su nombre y avatar */}
                {user ? (
                    <div className="d-flex align-items-center" style={{ gap: '0.5rem', color: '#fff', fontWeight: 600, marginRight: '1rem' }}>
                        {userAvatar ? (
                            <img src={userAvatar} alt="avatar" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                        ) : (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="8" r="4"/><path d="M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z"/></svg>
                        )}
                        <span>{userName}</span>
                    </div>
                ) : (
                    <button className='btn_login' onClick={() => navigate('/login')}>Iniciar sesión</button>
                )}

                <div className="dropdown">
                    <button className="dropdown-toggle btn_login" data-bs-toggle="dropdown">
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