// controllers/taskController.js
const Task = require('../models/Task');

// Crear tarea
exports.crearTarea = async (req, res) => {
  try {
    const { titulo, descripcion, estado } = req.body;
    const nuevaTarea = new Task({
      titulo,
      descripcion,
      estado,
      usuario: req.usuario.id,
    });
    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ message: 'Error creando la tarea', error });
  }
};

// Obtener todas las tareas del usuario logueado
exports.obtenerTareas = async (req, res) => {
  try {
    const tareas = await Task.find({ usuario: req.usuario.id }).sort({ createdAt: -1 });
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo las tareas', error });
  }
};

// Actualizar tarea (solo del usuario propietario)
exports.actualizarTarea = async (req, res) => {
  try {
    const tareaId = req.params.id;
    const tarea = await Task.findOne({ _id: tareaId, usuario: req.usuario.id });
    if (!tarea) return res.status(404).json({ message: 'Tarea no encontrada' });

    const { titulo, descripcion, estado } = req.body;
    tarea.titulo = titulo || tarea.titulo;
    tarea.descripcion = descripcion || tarea.descripcion;
    tarea.estado = estado || tarea.estado;

    await tarea.save();
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando la tarea', error });
  }
};

// Eliminar tarea (solo del usuario propietario)
exports.eliminarTarea = async (req, res) => {
  try {
    const tareaId = req.params.id;
    const tarea = await Task.findOneAndDelete({ _id: tareaId, usuario: req.usuario.id });
    if (!tarea) return res.status(404).json({ message: 'Tarea no encontrada' });

    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando la tarea', error });
  }
};
