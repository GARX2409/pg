import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const MediacionesActivas = () => {
    const [mediaciones, setMediaciones] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMediaciones = async () => {
            const response = await axios.get('http://localhost:5000/api/mediations', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setMediaciones(response.data);
        };
        fetchMediaciones();
    }, []);

    const eliminarMediacion = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esta acción',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/api/mediations/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Mediación eliminada',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setMediaciones(mediaciones.filter((mediacion) => mediacion._id !== id));
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo eliminar la mediación',
                });
            }
        }
    };

    return (
        <div className="mediaciones-activas-container">
            <h2>Mediaciones Activas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Tipo de Falta</th>
                        <th>Sede</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {mediaciones.map((mediacion) => (
                        <tr key={mediacion._id}>
                            <td>{mediacion.nombre}</td>
                            <td>{mediacion.titulo}</td>
                            <td>{mediacion.descripcion}</td>
                            <td>{mediacion.tipoFalta}</td>
                            <td>{mediacion.sede}</td>
                            <td>{mediacion.estado}</td>
                            <td>
                                <button onClick={() => eliminarMediacion(mediacion._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/menu-estudiante" className="btn btn-secondary">Regresar al Menú</Link>
        </div>
    );
};

export default MediacionesActivas;