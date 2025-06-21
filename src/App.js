import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import TopNavbar from './components/navigationBar/TopNavbar';
import Login from './pages/pages_Login_&_Register/Login';
import Register from './pages/pages_Login_&_Register/Register';
import Home from './pages/Home';
import Blogs from './pages/masters/Create_Blogs/Blogs';
import Footer from './components/Footer';
import About from './pages/page_About/About';
import Error404 from './pages/Error';
import Contacts from './pages/page_Contacts/Contacts';
import RequireAuth from './components/RequireAuth';
import Profile from './pages/masters/Profile';
import { getAllBlogs } from './api/blogsService';
import BlogInfo from './components/BlogInfo';

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
    const [blogs, setBlogs] = useState([]);

    useEffect(()=>{
        const fetchBlogs = async () => {
        try{
            const {data} = await getAllBlogs();
            setBlogs(data);
            console.log(data);
        }catch(err){
            console.error("Error al obtener informacion: ", err);
        }  
        }
        fetchBlogs();
    }, [])

    return (
        <Router>
            <Routes>
                {/* Ruta independiente para /login */}
                <Route path="/login" element={<Login />} />

                {/* Ruta independiente para /Register */}
                <Route path="/register" element={<Register />} />

                {/* Todas las demás rutas usan DefaultLayout */}
                <Route element={<DefaultLayout />}>
                    {/* Ruta de Home (/) */}
                    <Route path="/" element={<Home blogs={blogs} />} />
                    
                    {/* Ruta de Blogs (/blogs) */}
                    {/* Rutas protegidas */}
                    <Route element={<RequireAuth />}>
                        <Route path="/blogs" element={<Blogs blogs={blogs} setBlogs={setBlogs} />} />
                        <Route path="/perfil" element={<Profile />} />
                    </Route>
                    
                    {/* Ruta de About (/about) */}
                    <Route path="/about" element={<About />} />

                    {/* Ruta de Contacts (/contacts) */}
                    <Route path="/contacts" element={<Contacts />} />

                    {/* Ruta para BlogInfo (/blog/:id) */}
                    <Route path="/blog/:id" element={<BlogInfo blogs={blogs} />} />

                    {/* Error 404: todo path que no haya matcheado arriba caerá aquí */}
                    <Route path="*" element={<Error404 />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
