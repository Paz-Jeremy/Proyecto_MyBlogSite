import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Blogs from './pages/masters/Blogs';
import Footer from './pages/Footer.js'

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
                                    <Route path="/home" element={<Home />} />
                                    <Route path="/blogs" element={<Blogs />} />
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