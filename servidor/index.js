const express = require('express');
const conectarDB = require('./config/db')
//Crear el servidor 
const app = express();
//Conectar a la base de datos
conectarDB();
//puerto de el app
const PORT = process.env.PORT || 4000;
//Importar Rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.listen(PORT, ()=>{
    console.log(`El Servidor esta funcionando en el puerto ${PORT}`)
})