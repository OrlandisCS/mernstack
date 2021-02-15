//Rutas para autenticación
const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require('../middleware/auth');

//Iniciar sesión

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
//obtiene el usuario autenticado
router.get(
  "/",
 auth,
  authController.usuarioAutenticado
);

module.exports = router;
