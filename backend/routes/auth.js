const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Busca el usuario en la base de datos
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Compara la contraseña en texto plano (sin bcrypt)
        if (password !== user.password) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Genera el token JWT
        const token = jwt.sign({ id: user._id, role: user.role }, 'puente123', { expiresIn: '1h' });

        // Devuelve los datos necesarios
        res.json({ token, role: user.role, userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;