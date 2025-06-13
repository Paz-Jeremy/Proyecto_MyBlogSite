import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

const RequireAuth = () => {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
        // Obtiene la sesión actual de Supabase
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            // Guarda en localStorage para rutas ya cargadas
            localStorage.setItem('user', JSON.stringify(session.user));
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
        setLoading(false);
        };
        checkAuth();
    }, []);

    if (loading) {
        // Podrías retornar un spinner o placeholder mientras verificas
        return null;
    }
    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

export default RequireAuth;