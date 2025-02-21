import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const InformacionPersonal = () => {
    const [usuario, setUsuario] = useState({ username: '', password: '' });
    const [nuevaContrasena, setNuevaContrasena] = useState('');

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/user', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setUsuario(response.data);
            } catch (error) {
                console.error('Error al obtener la información del usuario:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo cargar la información del usuario',
                });
            }
        };

        fetchUsuario();
    }, []);

    const actualizarContrasena = async () => {
        try {
            await axios.put(
                'http://localhost:5000/api/auth/update-password',
                { password: nuevaContrasena },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }
            );
            Swal.fire({
                icon: 'success',
                title: 'Contraseña actualizada',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error('Error al actualizar la contraseña:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar la contraseña',
            });
        }
    };

    return (
        <div className="informacion-personal-container">
            <h2>Información Personal</h2>
            <p>Nombre de usuario: {usuario.username}</p>
            <div className="formulario">
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={nuevaContrasena}
                    onChange={(e) => setNuevaContrasena(e.target.value)}
                />
                <button onClick={actualizarContrasena}>Actualizar Contraseña</button>
            </div>
        </div>
    );
};

export default InformacionPersonal;