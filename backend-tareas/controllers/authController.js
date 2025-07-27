// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generarToken = (user) => {
  return jwt.sign(
    { id: user._id, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );
};

const generarRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRATION }
  );
};

exports.registrar = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Verificar si usuario ya existe
    const existeUser = await User.findOne({ email });
    if (existeUser) return res.status(400).json({ message: 'El usuario ya existe' });

    const user = new User({ nombre, email, password, rol });
    await user.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    const esPasswordValido = await user.compararPassword(password);
    if (!esPasswordValido) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = generarToken(user);
    const refreshToken = generarRefreshToken(user);

    // Enviar refresh token en cookie HTTP only
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // solo en prod con https
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });

    res.json({ token, user: { id: user._id, nombre: user.nombre, email: user.email, rol: user.rol } });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

exports.refreshToken = (req, res) => {
  try {
    const tokenRefresh = req.cookies.refreshToken;
    if (!tokenRefresh) return res.status(401).json({ message: 'No autorizado' });

    jwt.verify(tokenRefresh, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Token inválido' });

      const newToken = jwt.sign({ id: decoded.id, rol: decoded.rol }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });

      res.json({ token: newToken });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Sesión cerrada correctamente' });
};
