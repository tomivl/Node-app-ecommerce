const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const Usuario = require('../models/usuario')
//
passport.use(new localStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    //BUSCA AL USUARIO POR EL EMAIL
  const usuario = await  Usuario.findOne({email: email})
  if(!usuario){
      return done(null, false, {message: 'No se encontró el usuario'})
  } else{
   const match =  await usuario.matchPassword(password)
   if(match){
      return done(null, usuario)
   } else{
       return done(null, false, {message: 'contraseña incorrecta'})
   }
  }

}))

passport.serializeUser((usuario, done)=>{
    done(null, usuario.id)
})

passport.deserializeUser((id, done)=>{
    Usuario.findById(id, (err, user)=>{
        done(err, user)
    })
})