const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");
//Crea un atarea

exports.crearTarea = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  try {
    //Extraer el proyecto
    const { proyecto } = req.body;
    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    //Revisar si el proyecto actual pertenece a ese usuario
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    //Creamos la tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en el servidor");
  }
};
//Obtiene las tareas por proyectos
exports.obtenerTareas = async (req, res) => {
  //Extraemos el proyecto
  try {
    //Extraer el proyecto
    const { proyecto } = req.body;
    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    //Revisar si el proyecto actual pertenece a ese usuario
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    //Obtener las tareas por proyectos
    const tareas = await Tarea.find({ proyecto });
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en el servidor", error);
  }
};
//Actualizar tarea
exports.actualizarTarea = async (req, res) => {
  try {
    //Extraer el proyecto
    const { proyecto, nombre,estado } = req.body;

    //Revisar si existe dicha tarea
    let tarea = await Tarea.findById(req.params.id);
    if (!tarea) {
      return res.status(404).json({ msg: "No existe dicho Proyecto" });
    }
    //extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    //Revisar si el proyecto actual pertenece a ese usuario
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    //crear un objeto con la nueva información
    const nuevaTarea = {};
    if (nombre) nuevaTarea.nombre = nombre;
    if (estado) nuevaTarea.estado = estado;

    //guardar la tarea
    tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, {new: true});
    res.json({tarea})
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en el servidor");
  }
};
