//Rutas para crear usuarios
const express = require("express");
const router = express.Router();
const usurioController = require("../controllers/usuarioController");

const { check } = require("express-validator");

//crear un usuario

//Endpoint: /api/usuarios

router.post("/", 

[
    check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
    check('Email', 'Agrega un email válido').not().isEmail(),
    check('password', 'El Password debe ser minimo de  caracteres').isLength({min:6}),
],

usurioController.crearUsuario);

module.exports = router;
