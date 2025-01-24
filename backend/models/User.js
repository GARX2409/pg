const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Contraseña en texto plano
    role: { 
        type: String, 
        enum: ['estudiante', 'docente', 'mediador', 'developer'], 
        required: true 
    },
    profileImage: { type: String, default: 'https://via.placeholder.com/150' },
    sede: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);