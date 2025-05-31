import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Blogs from './pages/masters/Create_Blogs/Blogs';
import Footer from './components/Footer.js'
import About from './pages/page_About/About.js';

function App() {
    const [items, setItems] = useState([{
        title: "Progra Web",
        description: "Clase de los sabados"
    }]);
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={
                    <div>
                        <TopNavbar />
                            <div style={{
                                padding: '0px'
                            }}>
                                <Routes>
                                    <Route path="/*" element={<Home />} />
                                    <Route path="/blogs" element={<Blogs />} />
                                    <Route path="/about" element={<About />} />
                                </Routes>
                            </div>
                        <Footer />
                    </div>
                } />
            </Routes>
        </Router>
    );
}

export default App;