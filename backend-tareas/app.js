// app.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares globales
app.use(cors({
  origin: 'http://localhost:4200', // URL Angular dev
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Ruta base para probar
app.get('/', (req, res) => {
  res.send('API REST de Tareas funcionando');
});

module.exports = app;
