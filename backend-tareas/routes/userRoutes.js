// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protegerRuta } = require('../middlewares/authMiddleware');
const { autorizarRoles } = require('../middlewares/roleMiddleware');

router.use(protegerRuta);
router.get('/', autorizarRoles('admin'), userController.obtenerUsuarios);

module.exports = router;
