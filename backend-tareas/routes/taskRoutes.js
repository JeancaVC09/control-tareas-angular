// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { protegerRuta } = require('../middlewares/authMiddleware');

router.use(protegerRuta);

router.post('/', taskController.crearTarea);
router.get('/', taskController.obtenerTareas);
router.put('/:id', taskController.actualizarTarea);
router.delete('/:id', taskController.eliminarTarea);

module.exports = router;
