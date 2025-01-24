const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, 'puente123', { expiresIn: '1h' });
    res.json({ token, role: user.role, userId: user._id });
});

module.exports = router;