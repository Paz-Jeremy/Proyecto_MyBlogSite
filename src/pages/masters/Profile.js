// Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';

function Profile() {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // obtener el usuario actual de Supabase
        async function fetchUser() {
            const {
                data: { user },
                error
            } = await supabase.auth.getUser();
            if (error) {
                console.log('Error obteniendo usuario:', error.message);
                return;
            }
                setUserInfo(user);
        }
        fetchUser();
    }, []);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error al cerrar sesión:', error.message);
        } else {
            localStorage.removeItem('user');
            navigate('/login');
        }
    };

    if (!userInfo) {
        return <div className="container mt-5 mb-5">Cargando información...</div>;
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="card">
                <div className="card-header">
                    <h2>Perfil de Usuario</h2>
                </div>
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>ID:</strong> {userInfo.id}</li>
                        <li className="list-group-item"><strong>Nombre:</strong> {userInfo.user_metadata.full_name || 'No disponible'}</li>
                        <li className="list-group-item"><strong>Email:</strong> {userInfo.email}</li>
                        <li className="list-group-item"><strong>Fecha de creación:</strong> {new Date(userInfo.created_at).toLocaleDateString()}</li>
                        {/* Puedes agregar más campos si los tienes en metadata */}
                    </ul>
                </div>
                <div className="card-footer text-center">
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
