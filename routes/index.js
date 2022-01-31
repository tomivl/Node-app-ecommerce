const express = require('express')
const router = express.Router()

const Producto = require('../models/productos')

//RUTA PRINCIPAL
router.get('/', async (req, res) =>{
    const productos = await Producto.find().lean()
    res.render('index', { productos })
})

//CHAT SOPORTE
router.get('/chat', (req, res)=>{
    res.render('soporte')
})


//RUTA A LA INFO DE EL NEGOCIO
router.get('/acerca', (req, res)=>{
    res.render('acerca')
})

module.exports = router