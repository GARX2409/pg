const User = require('../models/User');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

const createUser = async (req, res) => {
    const { username, password, role, sede } = req.body;

    try {
        const user = new User({ username, password, role, sede });
        await user.save();
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { password, profileImage } = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, { password, profileImage }, { new: true });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };