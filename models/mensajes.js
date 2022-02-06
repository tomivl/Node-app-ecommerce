const mongoose = require('mongoose') 
const Schema = mongoose.Schema

const mensajeSchema = Schema({
    username: String,
    message: String,
    fyh: String
  });
  

module.exports = mongoose.model('Mensajes', mensajeSchema)
