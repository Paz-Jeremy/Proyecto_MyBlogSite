import React from 'react';
import { Link } from 'react-router-dom';

function SideNavbar() {
  return (
    <div className="bg-dark position-fixed" style={{ top: '56px', width: '200px', height: '100%' }}>
      <ul className="nav flex-column mt-3">
        <li><Link to="/" className="nav-link text-white">Dashboard</Link></li>
        <li><Link to="/perfil" className="nav-link text-white">Perfil</Link></li>
        <li><Link to="/books" className="nav-link text-white">Libros</Link></li>
        <li><Link to="/registro" className="nav-link text-white">Registro</Link></li>
      </ul>
    </div>
  );
}

export default SideNavbar;