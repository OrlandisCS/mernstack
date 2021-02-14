const Usuario = require("../models/Ususario");
const bcryptjs = require("bcryptjs");
const { validationResult, body } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  //extraer valores de request
  //const email = 'orlandis@gmail.com';
  const { email, password } = req.body;
  try {
    //revisar si el usuario esta registrado

    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }
    //Revisar pwd 
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if(!passCorrecto){
      return res.status(400).json({ msg: "Password Incorrecto" });
        
    }
    //si todo es correcto Crear y firmar el JWT
     const payload = {
        usuario:{
          id: usuario.id
        }
      };
      //Firmar el JWT
      jwt.sign(
        payload,
        process.env.SECRETA,
        {
          expiresIn: 3600,
        },
        (error, token) => {
          if (error) throw error;
  
          //Mensaje de confirmacion
          res.json({ token});
        }
      );
  } catch (error) {
    console.log(error);
  }
};
