const Mediation = require('../models/Mediation');
const User = require('../models/User');

const getStats = async (req, res) => {
    try {
        const mediationsActivas = await Mediation.countDocuments({ estado: 'En Proceso' });
        const mediacionesResueltas = await Mediation.countDocuments({ estado: 'Resuelto' });
        const mediacionesCanceladas = await Mediation.countDocuments({ estado: 'Cancelada' });
        const totalUsuarios = await User.countDocuments();
        const totalMediaciones = await Mediation.countDocuments();

        res.json({
            mediacionesActivas,
            mediacionesResueltas,
            mediacionesCanceladas,
            totalUsuarios,
            totalMediaciones,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { getStats };