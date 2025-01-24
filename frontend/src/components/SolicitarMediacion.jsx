import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const SolicitarMediacion = () => {
    const [mediacion, setMediacion] = useState({
        nombre: '',
        titulo: '',
        descripcion: '',
        tipoFalta: '',
        sede: localStorage.getItem('sede'),
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setMediacion({ ...mediacion, [e.target.name]: e.target.value });
    };

    const solicitarMediacion = async () => {
        try {
            await axios.post('/api/mediations', mediacion, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            Swal.fire({
                icon: 'success',
                title: 'Mediación solicitada',
                text: 'Los docentes y mediadores han sido notificados',
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/mediaciones-activas');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo solicitar la mediación',
            });
        }
    };

    return (
        <div className="solicitar-mediacion-container">
            <h2>Solicitar Mediación</h2>
            <div className="formulario">
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={mediacion.nombre}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="titulo"
                    placeholder="Título"
                    value={mediacion.titulo}
                    onChange={handleInputChange}
                />
                <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    value={mediacion.descripcion}
                    onChange={handleInputChange}
                />
                <select name="tipoFalta" value={mediacion.tipoFalta} onChange={handleInputChange}>
                    <option value="">Seleccione el tipo de falta</option>
                    <option value="Tipo 1">Tipo 1</option>
                    <option value="Tipo 2">Tipo 2</option>
                    <option value="Tipo 3">Tipo 3</option>
                </select>
                <button onClick={solicitarMediacion}>Solicitar Mediación</button>
            </div>
            <Link to="/menu-estudiante" className="btn btn-secondary">Regresar al Menú</Link>
        </div>
    );
};

export default SolicitarMediacion;