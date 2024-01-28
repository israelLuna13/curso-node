const express = require('express');
const app = express() // app de express

const {infoCursos} = require('./datos/cursos.js');
const routerMatematicas = require('./routes/matematicas.js');
const routerProgramacion = require('./routes/programacion.js');

//routers

app.use('/api/cursos/programacion',routerProgramacion);//asociamos el path base  a la constante
app.use('/api/cursos/matematicas',routerMatematicas);//asociamos el path base  a la constante
//------------------
console.log(infoCursos);

//routing
app.get('/',(req,res)=>{

res.send('Mi primer servidor cursos');
});
app.get('/api/cursos',(req,res)=>{
    res.send(JSON.stringify( infoCursos));
});




//////////////////

const PUERTO =process.env.PORT || 8000;
app.listen(PUERTO, () =>{
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}`);
});