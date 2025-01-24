import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';

const MenuMediador = () => {
    return (
        <div className="menu-container">
            <h1>Bienvenido Mediador</h1>
            <div className="menu-buttons">
                <Link to="/informacion-personal" className="btn btn-primary">Información Personal</Link>
                <Link to="/solicitar-mediacion" className="btn btn-success">Solicitar Mediación</Link>
                <Link to="/mediaciones-activas" className="btn btn-warning">Mediaciones Activas</Link>
                <Link to="/" className="btn btn-danger">Cerrar Sesión</Link>
            </div>
        </div>
    );
};

export default MenuMediador;