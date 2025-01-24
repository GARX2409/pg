const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['estudiante', 'docente', 'mediador', 'developer'], // Roles permitidos
        required: true 
    },
    profileImage: { type: String, default: 'https://via.placeholder.com/150' },
    sede: { type: String, required: true }
});

// Middleware para cifrar la contraseña antes de guardar
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);