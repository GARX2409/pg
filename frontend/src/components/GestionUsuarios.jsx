import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const GestionUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nuevoUsuario, setNuevoUsuario] = useState({ username: '', password: '', role: '', sede: '' });

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        const response = await axios.get('/api/users', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUsuarios(response.data);
    };

    const handleInputChange = (e) => {
        setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
    };

    const agregarUsuario = async () => {
        try {
            await axios.post('/api/users', nuevoUsuario, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            Swal.fire({
                icon: 'success',
                title: 'Usuario agregado',
                showConfirmButton: false,
                timer: 1500,
            });
            fetchUsuarios();
            setNuevoUsuario({ username: '', password: '', role: '', sede: '' });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo agregar el usuario',
            });
        }
    };

    const eliminarUsuario = async (id) => {
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
                await axios.delete(`/api/users/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario eliminado',
                    showConfirmButton: false,
                    timer: 1500,
                });
                fetchUsuarios();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo eliminar el usuario',
                });
            }
        }
    };

    return (
        <div className="gestion-usuarios-container">
            <h2>Gestión de Usuarios</h2>
            <div className="formulario">
                <input
                    type="text"
                    name="username"
                    placeholder="Nombre de usuario"
                    value={nuevoUsuario.username}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={nuevoUsuario.password}
                    onChange={handleInputChange}
                />
                <select name="role" value={nuevoUsuario.role} onChange={handleInputChange}>
                    <option value="">Seleccione un rol</option>
                    <option value="estudiante">Estudiante</option>
                    <option value="docente">Docente</option>
                    <option value="mediador">Mediador</option>
                    <option value="developer">Developer</option>
                </select>
                <input
                    type="text"
                    name="sede"
                    placeholder="Sede"
                    value={nuevoUsuario.sede}
                    onChange={handleInputChange}
                />
                <button onClick={agregarUsuario}>Agregar Usuario</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre de Usuario</th>
                        <th>Rol</th>
                        <th>Sede</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario._id}>
                            <td>{usuario.username}</td>
                            <td>{usuario.role}</td>
                            <td>{usuario.sede}</td>
                            <td>
                                <button onClick={() => eliminarUsuario(usuario._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GestionUsuarios;