import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

const RequireAuth = () => {
    // loading: indica si todavía estamos comprobando el estado de autenticación.
    const [loading, setLoading] = useState(true);

    // isAuth: booleano que refleja si el usuario está autenticado.
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
        // Login propio: comprueba si en localStorage hay un ítem 'user'.
        const localUser = !!localStorage.getItem('user'); //localStorage.getItem('user') devuelve null o una cadena. !! convierte el resultado a booleano.

        // OAuth de Supabase: Llama a supabase.auth.getSession(), que devuelve la sesión actual.
        const { data: { session } } = await supabase.auth.getSession();
        const supaUser = !!session?.user; // Extrae session.user y lo convierte a booleano con !!.

        // Si cualquiera de las dos comprobaciones da true, marcamos isAuth como true.
        if (localUser || supaUser) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
        setLoading(false); // Finalmente ponemos loading a false para indicar que hemos terminado la verificación.
        };
        checkAuth();
    }, []);

    if (loading) {
        return null; // Poner un spinner o un mensaje de carga mas adelante
    }

    // Si la verificación ya terminó y isAuth === false, redirige automáticamente a la ruta /login.
    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    // Si isAuth === true, devuelve <Outlet />, que representa “el resto” de la ruta protegida (sus componentes hijos).
    return <Outlet />;
};

export default RequireAuth;