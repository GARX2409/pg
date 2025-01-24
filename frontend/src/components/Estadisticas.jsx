import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Estadisticas = () => {
    const [stats, setStats] = useState({});

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/stats', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setStats(response.data);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar las estadísticas',
                });
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="estadisticas-container">
            <h2>Estadísticas</h2>
            <p>Mediaciones Activas: {stats.mediacionesActivas}</p>
            <p>Mediaciones Resueltas: {stats.mediacionesResueltas}</p>
            <p>Mediaciones Canceladas: {stats.mediacionesCanceladas}</p>
            <p>Total Usuarios: {stats.totalUsuarios}</p>
            <p>Total Mediaciones: {stats.totalMediaciones}</p>
        </div>
    );
};

export default Estadisticas;