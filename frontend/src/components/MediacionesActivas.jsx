import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MediacionesActivas = () => {
    const [mediaciones, setMediaciones] = useState([]);
    const userRole = localStorage.getItem('role');

    useEffect(() => {
        fetchMediaciones();
    }, []);

    const fetchMediaciones = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/mediations', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setMediaciones(response.data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar las mediaciones',
            });
        }
    };

    const actualizarEstado = async (id, nuevoEstado) => {
        try {
            await axios.put(`http://localhost:5000/api/mediations/${id}`, 
                { estado: nuevoEstado },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
            );
            fetchMediaciones();
            Swal.fire({
                icon: 'success',
                title: 'Estado actualizado',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar el estado',
            });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Mediaciones Activas</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Título</th>
                            <th className="px-4 py-2">Descripción</th>
                            <th className="px-4 py-2">Tipo de Falta</th>
                            <th className="px-4 py-2">Sede</th>
                            <th className="px-4 py-2">Estado</th>
                            {(userRole === 'mediador' || userRole === 'docente' || userRole === 'developer') && (
                                <th className="px-4 py-2">Acciones</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {mediaciones.map((mediacion) => (
                            <tr key={mediacion._id} className="border-b">
                                <td className="px-4 py-2">{mediacion.nombre}</td>
                                <td className="px-4 py-2">{mediacion.titulo}</td>
                                <td className="px-4 py-2">{mediacion.descripcion}</td>
                                <td className="px-4 py-2">{mediacion.tipoFalta}</td>
                                <td className="px-4 py-2">{mediacion.sede}</td>
                                <td className="px-4 py-2">{mediacion.estado}</td>
                                {(userRole === 'mediador' || userRole === 'docente' || userRole === 'developer') && (
                                    <td className="px-4 py-2">
                                        <select
                                            onChange={(e) => actualizarEstado(mediacion._id, e.target.value)}
                                            className="border rounded px-2 py-1"
                                            value={mediacion.estado}
                                        >
                                            <option value="pendiente">Pendiente</option>
                                            <option value="en_proceso">En Proceso</option>
                                            <option value="resuelta">Resuelta</option>
                                            <option value="cancelada">Cancelada</option>
                                        </select>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <Link 
                    to 
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Regresar al Menú
                </Link>
            </div>
        </div>
    );
};

export default MediacionesActivas;