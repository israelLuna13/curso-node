const express = require('express');
//COLOCAR LO QUE SE HIZO EN matematicas 
const {matematicas} = require('../datos/cursos.js').infoCursos;//

const routerMatematicas = express.Router();

//middleware
//se ejecutan despues de recibir una solicitud
//se ejecutan antes de enviar una respuesta
routerMatematicas.use(express.json());//permite procesar el cuerpo de la solicitud

//ruta home
routerMatematicas.get('/',(req,res)=>{
    res.send(JSON.stringify(matematicas));
});
//ruta para un tema
routerMatematicas.get('/:tema',(req,res)=>{
    const tema = req.params.tema;//obtenemos el tema de los parametros de la url
    const resultados = 
    matematicas.filter(curso => curso.tema === tema);//obtenems los cursos de ese tema

    //validamos que tenga resultados
    if(resultados.length === 0 ){
        return res.status(204).send('no se encontro el curso');
    }

         //mostramos el valor del parametro query
        //console.log(req.query.ordenar);
    
        //parametros query
        //ordenamos de mayor a menos en base a vistas
        //vistas es el parametro query
        if(req.query.ordenar === 'vistas'){
            return res.send(resultados.sort((a,b)=>b.vistas - a.vistas ));
         }
    //no es necesario usar el stringify, el metodo send lo envia por defecto en json
    //res.send(JSON.stringify(resultados));
    res.send(resultados);
});

//ruta para un nivel de un tema
routerMatematicas.get('/:tema/nivel',()=>{
    const tema = req.params.tema;
    const nivel = req.params.nivel;

    const resultados = 
        matematicas.filter(curso => curso.tema === tema && curso.nivel === nivel);
    if(resultados.length === 0 ){
        return res.status(204).send('No se encontro el curso');
    }
});


  //POST - crear un nuevo curso
  routerMatematicas.post('/',(req,res)=>{
    let cursoNuevo = req.body;
    matematicas.push(cursoNuevo);
    res.send(matematicas);
});

//PUT // actualizar todo el curso
routerMatematicas.put('/:id',(req,res)=>{
    const cursoActualizado = req.body;
    const id = req.params.id;

    //comparacion no tan estricta == 
    const indice = matematicas.findIndex(curso => curso.id == id);//buscamos el objeto en el arreglo

    if(indice >= 0){
        matematicas[indice] = cursoActualizado
    }
    res.send(matematicas);
});

//PATCH //actualizar solo algunas partes del curso
routerMatematicas.patch('/:id',(req,res)=>{
    const infoActualizada = req.body;
    const id = req.params.id;

    const indice = matematicas.findIndex(curso => curso.id == id);
    if(indice >= 0){
        const cursoAModificar = matematicas[indice];
        Object.assign(cursoAModificar,infoActualizada);
    }

    res.send(matematicas);


});

//Delete
routerMatematicas.delete('/:id',(req,res)=>{
    const id = req.params.id;
    const indice = matematicas.findIndex(curso => curso.id == id);
    if(indice >= 0){

        //se le pasa el indice y la cantidad de elementos a eliminar
        matematicas.splice(indice,1);
    }

    res.send(matematicas);


})

module.exports= routerMatematicas