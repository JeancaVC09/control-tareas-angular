// controllers/userController.js
const User = require('../models/User');

// Obtener todos los usuarios - solo admin
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo usuarios', error });
  }
};
