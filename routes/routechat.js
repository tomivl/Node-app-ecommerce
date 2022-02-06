const express = require('express')
const router = express.Router()
const Mensajes = require('../models/mensajes')

router.get('/soporte', async (req, res)=>{
    const mensajes = await Mensajes.find().lean()
    res.render('soporte', {mensajes})
})

//SE GUARDA MENSAJE INGRESADO EN LA BASE DE DATOS EN LA COLECCION MENSAJES
router.post('/guardarMensaje', async (req, res)=>{
const {username, message} = req.body
const newMessage = new Mensajes({username, message})
await newMessage.save()
req.flash('success_msg', 'su mensaje ha sido enviado, pronto nos comunicaremos con usted..' )
res.redirect('soporte')
})

module.exports = router