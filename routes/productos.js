const express = require('express')
const router = express.Router()

// LLAMO ESQUEMA DE PRODUCTO
const Producto = require('../models/productos')
const {isAuthenticated} = require('../helpers/auth')
 
//LLAMA A LA VISTA DEL FORMULARIO PARA AGREGAR PRODUCTO
router.get('/productos/add', (req,res) =>{
    res.render('productos/new-product')
})

// INGRESA EL PRODUCTO NUEVO A LA BASE DE DATOS Y REDIRECCIONA  A LA LISTA DE PRODUCTOS

router.post('/productos/new-product', isAuthenticated , async (req, res) =>{
const {title, imgURL, price, description} = req.body
const errors = []
if(!title) {
    errors.push({text : 'por favor ingrese un titulo'})
}
if(!price) {
    errors.push({text:'por favor ingrese un precio'})
}
if(!description) {
    errors.push({text: 'por favor ingrese una descripcion'})
}
if(errors.length > 0) {
res.render('productos/new-product', {
    errors, 
    title,
    imgURL,
    price,
    description
})
} else {
const newProducto = new Producto({title, imgURL, price, description})
await newProducto.save()
req.flash('success_msg', 'producto agregado a la tienda.' )
res.redirect('/listaProductos')
 }
})

// LLEVA A LA VISTA DE LOS PRODUCTOS
router.get('/listaProductos', isAuthenticated ,async (req, res)=>{
  const productos = await Producto.find().lean()
  res.render('productos/listaProductos', { productos })
})
//RUTA PARA EDITAR UN PRODUCTO Y QUE LA BASE DE DATOS DE EL OBJETO

router.get('/productos/edit/:id',isAuthenticated , async (req, res) =>{
  const producto = await Producto.findById(req.params.id).lean()
    res.render('productos/edit-producto', {producto})
})

// ENVIA EL PRODUCTO EDITADO Y REDIRECCIONA A LA LISTA
router.put('productos/edit-producto/:id',isAuthenticated , async (req, res) =>{
    const {title, imgURL, price, description} = req.body
   await Producto.findByIdAndUpdate(req.params.id, {title, imgURL, price, description} )
   req.flash('success_msg', 'Producto actualizado.')
   res.redirect('/listaProductos')

})
//BORRA UN PRODUCTO
router.delete('/productos/delete/:id',isAuthenticated , async (req, res) =>{
  await  Producto.findByIdAndDelete(req.params.id)
  req.flash('success_msg', 'Producto removido.')
    res.redirect('/listaProductos')
})

module.exports = router