const express = require('express')
const router = express.Router()

router.get('/carrito', (req, res)=>{
    res.render('tienda/carrito')
})

module.exports = router