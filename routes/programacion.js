const express = require('express');
const {programacion} = require('../datos/cursos.js').infoCursos;

const routerProgramacion = express.Router();
//middleware
//se ejecutan despues de recibir una solicitud
//se ejecutan antes de enviar una respuesta
routerProgramacion.use(express.json());//permite procesar el cuerpo de la solicitud

//router
//obtiene todos los cursos de programacion
routerProgramacion.get('/',(req,res)=>{
    res.send(programacion);
    });
     
    //parametros en url programacion
    //router
routerProgramacion.get('/:lenguaje',(req,res)=>{
    const lenguaje = req.params.lenguaje;//obtenemos el parametro de la url
    const resultados = 
        programacion.filter(curso => curso.lenguaje === lenguaje) //obtenemos solo los cursos con ese lenguaje(aqui iria una consulta sql)
        if(resultados.length === 0 ){
            return res.status(204).send('No se encontro el curso');
        }
    
        //mostramos el valor del parametro query
        //console.log(req.query.ordenar);
    
        //parametros query
        //ordenamos de mayor a menos en base a vistas
        //vistas es el parametro query
        if(req.query.ordenar === 'vistas'){
           return res.send(resultados.sort((a,b)=>b.vistas - a.vistas ));
        }
        res.send(JSON.stringify(resultados));
    });

    //mas de un parametro en la url
    routerProgramacion.get('/:lenguaje/:nivel',(req,res)=>{
        const lenguaje = req.params.lenguaje;
        const nivel = req.params.nivel;
    
        const resultados = 
        programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel)
    
        if(resultados.length === 0 ){
          return res.status(204).send(`No se encontraron cursos de ${lenguaje} en el nivel ${nivel}`);
        
           //return res.status(404).end();
        }
        res.send(resultados);
    
    });

    //POST - crear un nuevo curso
    routerProgramacion.post('/',(req,res)=>{
        let cursoNuevo = req.body;
        programacion.push(cursoNuevo);
        res.send(programacion);
    });

    //PUT // actualizar todo el curso
    routerProgramacion.put('/:id',(req,res)=>{
        const cursoActualizado = req.body;
        const id = req.params.id;

        //comparacion no tan estricta == 
        const indice = programacion.findIndex(curso => curso.id == id);//buscamos el objeto en el arreglo

        if(indice >= 0){
            programacion[indice] = cursoActualizado
        }
        res.send(programacion);
    });

    //PATCH //actualizar solo algunas partes del curso
    routerProgramacion.patch('/:id',(req,res)=>{
        const infoActualizada = req.body;
        const id = req.params.id;

        const indice = programacion.findIndex(curso => curso.id == id);
        if(indice >= 0){
            const cursoAModificar = programacion[indice];
            Object.assign(cursoAModificar,infoActualizada);
        }

        res.send(programacion);


    });

    //Delete
    routerProgramacion.delete('/:id',(req,res)=>{
        const id = req.params.id;
        const indice = programacion.findIndex(curso => curso.id == id);
        if(indice >= 0){

            programacion.splice(indice,1);
        }

        res.send(programacion);


    })


    module.exports = routerProgramacion;