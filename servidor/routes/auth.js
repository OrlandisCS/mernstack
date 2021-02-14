//Rutas para autenticación
const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const authController = require("../controllers/authController");
//crear un usuario

//Endpoint: /api/auth

router.post(
  "/",
  [
    check("Email", "Agrega un email válido").not().isEmail(),
    check("password", "El Password debe ser minimo de  caracteres").isLength({
      min: 6,
    }),
  ],
  authController.autenticarUsuario
);

module.exports = router;
