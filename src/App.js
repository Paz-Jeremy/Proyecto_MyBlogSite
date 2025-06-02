import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Blogs from './pages/masters/Create_Blogs/Blogs';
import Footer from './components/Footer';
import About from './pages/page_About/About';
import Error404 from './pages/Error';
import { Outlet } from 'react-router-dom';

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
    return (
        <Router>
            <Routes>
                {/* Ruta independiente para /login */}
                <Route path="/login" element={<Login />} />

                {/* Todas las demás rutas usan DefaultLayout */}
                <Route element={<DefaultLayout />}>
                    {/* Ruta de Home (/) */}
                    <Route path="/" element={<Home />} />
                    
                    {/* Ruta de Blogs (/blogs) */}
                    <Route path="/blogs" element={<Blogs />} />
                    
                    {/* Ruta de About (/about) */}
                    <Route path="/about" element={<About />} />

                    {/* Error 404: todo path que no haya matcheado arriba caerá aquí */}
                    <Route path="*" element={<Error404 />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
