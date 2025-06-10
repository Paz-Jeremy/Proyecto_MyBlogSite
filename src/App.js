import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';
import Login from './pages/page_Login/Login';
import Home from './pages/Home';
import Blogs from './pages/masters/Create_Blogs/Blogs';
import Footer from './components/Footer';
import About from './pages/page_About/About';
import Error404 from './pages/Error';
import Contacts from './pages/page_Contacts/Contacts';

// Este componente Layout solo coloca Navbar arriba, <Outlet/> en medio y Footer al final
function DefaultLayout() {
    return (
        <div>
            <TopNavbar />
            <main style={{ padding: 0 }}>
                {/* Aquí se renderizarán las rutas hijas */}
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

function App() {
    // Inicializamos el estado con los dos blogs por defecto
    const [blogs, setBlogs] = useState([
        {
        title: 'Xbox',
        author: 'Jeremy Castellanos',
        description: 'Información general de Xbox',
        publishDate: '2025-06-06',
        image:
            'https://xboxwire.thesourcemediaassets.com/sites/2/2024/11/New-Xbox-Series-X_S-Console-Options-Family_NoText-65586e62c31bf0eee51f.jpg',
        },
        {
        title: 'Playstation',
        author: 'Juan Garcia',
        description: 'Información general de Playstation',
        publishDate: '2024-06-06',
        image:
            'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/6162/production/_114403942_ps5.jpg.webp',
        },
    ]);
    
    return (
        <Router>
            <Routes>
                {/* Ruta independiente para /login */}
                <Route path="/login" element={<Login />} />

                {/* Todas las demás rutas usan DefaultLayout */}
                <Route element={<DefaultLayout />}>
                    {/* Ruta de Home (/) */}
                    <Route path="/" element={<Home blogs={blogs} />} />
                    
                    {/* Ruta de Blogs (/blogs) */}
                    <Route path="/blogs" element={<Blogs blogs={blogs} setBlogs={setBlogs} />} />
                    
                    {/* Ruta de About (/about) */}
                    <Route path="/about" element={<About />} />

                    {/* Ruta de Contacts (/contacts) */}
                    <Route path="/contacts" element={<Contacts />} />

                    {/* Error 404: todo path que no haya matcheado arriba caerá aquí */}
                    <Route path="*" element={<Error404 />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
