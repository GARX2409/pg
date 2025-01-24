const mongoose = require('mongoose');

const MediationSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    tipoFalta: { type: String, required: true },
    sede: { type: String, required: true },
    estado: { type: String, default: 'En Proceso' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mediation', MediationSchema);