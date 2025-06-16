import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import './TopNavbar.css';

function TopNavbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // 1. Al montar, intenta cargar usuario de localStorage o Supabase
        const initUser = async () => {
        const stored = localStorage.getItem('user');
        if (stored) {
            setUser(JSON.parse(stored));
        } else {
            const { data } = await supabase.auth.getUser();
            if (data.user) {
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            }
        }
        };
        initUser();

        // 2. Suscríbete a cambios de auth
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT') {
            // Limpia estado y storage al cerrar sesión
            setUser(null);
            localStorage.removeItem('user');
            navigate('/login');
        }
        if (event === 'SIGNED_IN' && session?.user) {
            // Actualiza estado al iniciar sesión
            setUser(session.user);
            localStorage.setItem('user', JSON.stringify(session.user));
        }
        });

        // 3. Cleanup al desmontar
        return () => {
        listener.subscription.unsubscribe();
        };
    }, [navigate]);

    // Nombre y avatar
    const userName = user?.user_metadata?.full_name || user?.email || 'Usuario';
    const userAvatar = user?.user_metadata?.avatar_url;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#031926' }}>
            <div className="container" style={{ width: '15%' }}>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <button className="nav-link" href="#" onClick={() => navigate('/')}>
                            <img
                                src="https://i.postimg.cc/zDjJ7LH4/Logo-My-Blog-Site2.png"
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