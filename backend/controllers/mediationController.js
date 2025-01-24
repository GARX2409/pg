const Mediation = require('../models/Mediation');

const getMediations = async (req, res) => {
    try {
        const mediations = await Mediation.find().populate('createdBy');
        res.json(mediations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

const createMediation = async (req, res) => {
    const { nombre, titulo, descripcion, tipoFalta, sede } = req.body;

    try {
        const mediation = new Mediation({ nombre, titulo, descripcion, tipoFalta, sede, createdBy: req.user.id });
        await mediation.save();
        res.json(mediation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

const updateMediation = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    try {
        const mediation = await Mediation.findByIdAndUpdate(id, { estado }, { new: true });
        res.json(mediation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

const deleteMediation = async (req, res) => {
    const { id } = req.params;

    try {
        await Mediation.findByIdAndDelete(id);
        res.json({ message: 'Mediación eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { getMediations, createMediation, updateMediation, deleteMediation };