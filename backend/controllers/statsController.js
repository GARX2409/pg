const Mediation = require('../models/Mediation');
const User = require('../models/User');

const getStats = async (req, res) => {
    try {
        // Obtener estadísticas de mediaciones
        const mediacionesActivas = await Mediation.countDocuments({ estado: 'En Proceso' });
        const mediacionesResueltas = await Mediation.countDocuments({ estado: 'Resuelto' });
        const mediacionesCanceladas = await Mediation.countDocuments({ estado: 'Cancelada' });

        // Obtener estadísticas de usuarios
        const totalUsuarios = await User.countDocuments();

        // Obtener el total de mediaciones
        const totalMediaciones = await Mediation.countDocuments();

        // Enviar la respuesta con las estadísticas
        res.json({
            mediacionesActivas,
            mediacionesResueltas,
            mediacionesCanceladas,
            totalUsuarios,
            totalMediaciones,
        });
    } catch (error) {
        console.error('Error al obtener las estadísticas:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { getStats };