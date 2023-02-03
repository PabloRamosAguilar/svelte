const {application} = require('express')
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.static('public'));
app.use(express.json())

const PORT = process.env.PORT || 5000
const DB_URI = process.env.DB_URI || "mongodb://127.0.0.1:27017/tienda"

mongoose.connect(DB_URI)
.then( db => console.log("Conectado a servidor de base de datos"))
.catch( err => console.log("error", err))

const Articulo = mongoose.model('Articulo', new mongoose.Schema(
{
    nombre: String,
    precio: Number
}));

const Cliente = mongoose.model('Cliente', new mongoose.Schema(
    {
        nombre: String,
        apellido: String
    }));

app.get("/api/articulos", cors(), (req,res) => {
    Articulo.find( 
        {},
        (error, data) => {if(error) res.json(error);else res.json(data) }  
     )
});

app.post("/api/articulos",cors(), (req,res) => {
    new Articulo({nombre: req.body.nombre, precio: req.body.precio}).save((error,data) => {if (error) res.json(error);else res.json(data)})
});

app.delete("/api/articulos/:id", cors(),(req,res) => {
    Articulo.findOneAndRemove( 
        {_id: req.params.id},
        (error, data) => {if(error) res.json(error);else res.json(data) }  
     )
});

app.put("/api/articulos/:id", cors(),(req,res) => {
    Articulo.findOneAndUpdate( 
        {_id: req.params.id},
        {$set: {nombre: req.body.nombre, precio: req.body.precio}},
        (error, data) => {if(error) res.json(error);else res.json(data) }  
     )
});

app.get("/api/clientes", cors(), (req,res) => {
    Cliente.find( 
        {},
        (error, data) => {if(error) res.json(error);else res.json(data) }  
     )
});

app.post("/api/clientes",cors(), (req,res) => {
    new Cliente({nombre: req.body.nombre, apellido: req.body.apellido}).save((error,data) => {if (error) res.json(error);else res.json(data)})
});

app.delete("/api/clientes/:id", cors(),(req,res) => {
    Cliente.findOneAndRemove( 
        {_id: req.params.id},
        (error, data) => {if(error) res.json(error);else res.json(data) }  
     )
});

app.put("/api/clientes/:id", cors(),(req,res) => {
    Cliente.findOneAndUpdate( 
        {_id: req.params.id},
        {$set: {nombre: req.body.nombre, apellido: req.body.apellido}},
        (error, data) => {if(error) res.json(error);else res.json(data) }  
     )
});


app.listen(PORT, () => {console.log("Iniciando Servidor Web")});

// const articulos = [
//     {nombre: "Camisa", precio: 22},
//     {nombre: "Botas", precio: 21}
// ]

// app.get ("/api/articulos", (req, res) => {
//     res.json(articulos);
// })

// app.post ("/api/articulos", (req, res) => {
    
//     articulos.push({
//         nombre: req.body.nombre, precio: req.body.precio
//     });
//     res.json(articulos);
// })

// app.delete ("/api/articulos/:id", (req, res) => {

//     //let articulos2 = articulos.filter((value,index) => index != req.params.id);
//     articulos.splice(req.params.id, 1)

//     res.json(articulos);
// })

// app.put ("/api/articulos/:id", (req, res) => {

//     articulos[req.params.id] = req.body;

//     res.json(articulos);
// })

