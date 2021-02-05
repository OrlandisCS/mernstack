//Rutas para crear usuarios
const express = require("express");
const router = express.Router();
const usurioController = require('../controllers/usuarioController')
//crear un usuario 
//Endpoint: /api/usuarios

router.post('/', usurioController.crearUsuario);

module.exports = router;