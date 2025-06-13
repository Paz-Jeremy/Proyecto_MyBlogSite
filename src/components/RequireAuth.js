import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

const RequireAuth = () => {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
        // 1) ¿Tengo un user en localStorage? (login propio)
        const localUser = !!localStorage.getItem('user');

        // 2) ¿Tengo sesión en Supabase? (OAuth)
        const { data: { session } } = await supabase.auth.getSession();
        const supaUser = !!session?.user;

        if (localUser || supaUser) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
        setLoading(false);
        };
        checkAuth();
    }, []);

    if (loading) {
        return null; // o tu spinner
    }
    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

export default RequireAuth;