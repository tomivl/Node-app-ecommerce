const mongoose = require('mongoose') 
const Schema = mongoose.Schema

//MODELO DE PRODUCTO EN LA BASE DE DATOS
const productoSchema = Schema ({
   imgURL: {type: String, required: true},
   title: {type: String, required: true},
   price: {type: String, required: true},
   description: {type: String, required: true},
   date: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Producto', productoSchema)