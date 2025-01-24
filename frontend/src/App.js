import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import MenuEstudiante from './components/MenuEstudiante';
import MenuDocente from './components/MenuDocente';
import MenuMediador from './components/MenuMediador';
import MenuDeveloper from './components/MenuDeveloper';
import GestionUsuarios from './components/GestionUsuarios';
import GestionMediaciones from './components/GestionMediaciones';
import Estadisticas from './components/Estadisticas';
import './styles/App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/menu-estudiante" element={<MenuEstudiante />} />
                <Route path="/menu-docente" element={<MenuDocente />} />
                <Route path="/menu-mediador" element={<MenuMediador />} />
                <Route path="/menu-developer" element={<MenuDeveloper />} />
                <Route path="/gestion-usuarios" element={<GestionUsuarios />} />
                <Route path="/gestion-mediaciones" element={<GestionMediaciones />} />
                <Route path="/estadisticas" element={<Estadisticas />} />
            </Routes>
        </Router>
    );
}

export default App;