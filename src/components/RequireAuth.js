import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
    const user = localStorage.getItem('user');
    // Si no hay usuario almacenado, redirigir a login
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    // Si está autenticado, renderizar las rutas hijas
    return <Outlet />;
};

export default RequireAuth;