const mongoose = require('mongoose') 
const Schema = mongoose.Schema

const mensajeSchema = Schema({
    author: Object,
    text: String,
    fyh: String
  });
  

module.exports = mongoose.model('mensajes', mensajeSchema)
