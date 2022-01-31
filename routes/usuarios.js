const express = require('express')
const router = express.Router()
const Usuario = require('../models/usuario')
const passport = require('passport')


//LLEVA A LA VISTA SIGNIN
router.get('/usuarios/signin', (req, res) =>{
res.render('users/signin')
})
//DIRECCIONAMIENTO DESDE EL SIGNIN
router.post('/usuarios/signin', passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect: '/usuarios/signin',
    failureFlash: true
    
}))
// ruta ak formulario signup
router.get('/usuarios/signup', (req, res) =>{
    res.render('users/signup')
})

// INGRESO DATOS DESDE EL FORMULARIO CON MANEJO DE ERRORES

router.post('/usuarios/signup',async (req,res)=>{
const{name, email, password, confirmPassword} = req.body
const errors = []
if(name.length <= 0){
    errors.push({text: 'Por favor ingrese su nombre'})
}
if ( password != confirmPassword){
    errors.push({text: 'Las contraseñas no coinciden'})
}
if(password.length < 5){
    errors.push({text: 'Las contraseña debe tener al menos 5 caracteres'})
}
if(errors.length > 0){
    res.render('users/signup', {errors, name, email, password, confirmPassword})
} else{
const emailUser = await Usuario.findOne({email: email})
if(emailUser){
    req.flash('success_msg', 'El email ya se encuentra en uso')
    res.redirect('/usuarios/signup')
} else {
    const nuevoUsuario = new Usuario({name, email, password})
    nuevoUsuario.password = await nuevoUsuario.encryptPassword(password)
   await nuevoUsuario.save()
   req.flash('success_msg', 'Estas registrado')
   res.redirect('/usuarios/signin')
}}
})

 //FINALIZA LA SESSION DEL USUARIO

router.get('/usuarios/logout', (req,res)=>{
    req.logOut()
    res.redirect('/')
})

module.exports = router