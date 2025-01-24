import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const GestionMediaciones = () => {
    const [mediaciones, setMediaciones] = useState([]);
    const [nuevaMediacion, setNuevaMediacion] = useState({
        nombre: '',
        titulo: '',
        descripcion: '',
        tipoFalta: '',
        sede: '',
    });

    useEffect(() => {
        fetchMediaciones();
    }, []);

    const fetchMediaciones = async () => {
        const response = await axios.get('http://localhost:5000/api/mediations', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setMediaciones(response.data);
    };

    const handleInputChange = (e) => {
        setNuevaMediacion({ ...nuevaMediacion, [e.target.name]: e.target.value });
    };

    const agregarMediacion = async () => {
        try {
            await axios.post('http://localhost:5000/api/mediations', nuevaMediacion, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            Swal.fire({
                icon: 'success',
                title: 'Mediación agregada',
                showConfirmButton: false,
                timer: 1500,
            });
            fetchMediaciones();
            setNuevaMediacion({
                nombre: '',
                titulo: '',
                descripcion: '',
                tipoFalta: '',
                sede: '',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo agregar la mediación',
            });
        }
    };

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
                fetchMediaciones();
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
        <div className="gestion-mediaciones-container">
            <h2>Gestión de Mediaciones</h2>
            <div className="formulario">
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={nuevaMediacion.nombre}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="titulo"
                    placeholder="Título"
                    value={nuevaMediacion.titulo}
                    onChange={handleInputChange}
                />
                <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    value={nuevaMediacion.descripcion}
                    onChange={handleInputChange}
                />
                <select name="tipoFalta" value={nuevaMediacion.tipoFalta} onChange={handleInputChange}>
                    <option value="">Seleccione el tipo de falta</option>
                    <option value="Tipo 1">Tipo 1</option>
                    <option value="Tipo 2">Tipo 2</option>
                    <option value="Tipo 3">Tipo 3</option>
                </select>
                <select name="sede" value={nuevaMediacion.sede} onChange={handleInputChange}>
                    <option value="">Seleccione una sede</option>
                    <option value="Central">Central</option>
                    <option value="Popular">Popular</option>
                    <option value="Calvache">Calvache</option>
                    <option value="Vallejo">Vallejo</option>
                </select>
                <button onClick={agregarMediacion}>Agregar Mediación</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Tipo de Falta</th>
                        <th>Sede</th>
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
                            <td>
                                <button onClick={() => eliminarMediacion(mediacion._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GestionMediaciones;