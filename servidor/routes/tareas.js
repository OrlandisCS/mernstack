const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//crear una tarea

//Endpoint: /api/tareas

router.post('/', 
auth,
[
    check('nombre', 'El nombre de la tarea es requerido').not().isEmpty(),
    check('proyecto', 'El proyecto de la tarea es requerido').not().isEmpty(),
],
tareaController.crearTarea);
//Obtener tareas por proyecto

router.get('/',
auth,
tareaController.obtenerTareas
);

//Actualizar la tarea

router.put('/:id',
auth,
tareaController.actualizarTarea);

module.exports = router;