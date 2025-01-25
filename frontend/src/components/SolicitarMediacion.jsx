import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';

const SolicitarMediacion = () => {
    const [mediacion, setMediacion] = useState({
        nombre: '',
        titulo: '',
        descripcion: '',
        tipoFalta: '',
        sede: localStorage.getItem('sede') || '',
        estado: 'pendiente'
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setMediacion({ ...mediacion, [e.target.name]: e.target.value });
    };

    const solicitarMediacion = async () => {
        try {
            await axios.post('http://localhost:5000/api/mediations', mediacion, {
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
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Solicitar Mediación</h2>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={mediacion.nombre}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Título"
                        value={mediacion.titulo}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        name="descripcion"
                        placeholder="Descripción"
                        value={mediacion.descripcion}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                    />
                </div>
                <div className="mb-4">
                    <select 
                        name="tipoFalta" 
                        value={mediacion.tipoFalta} 
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Seleccione el tipo de falta</option>
                        <option value="Tipo 1">Tipo 1</option>
                        <option value="Tipo 2">Tipo 2</option>
                        <option value="Tipo 3">Tipo 3</option>
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <button 
                        onClick={solicitarMediacion}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Solicitar Mediación
                    </button>
                    <Link 
                        to="" 
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Regresar al Menú
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SolicitarMediacion;