const Cart = require("../models/carrito")
const router = require("express").Router()

const {isAuthenticated} = require('../helpers/auth')


//CREAR CARTA
router.post("/carta",isAuthenticated, async (req, res) => {
  const newCart = new Cart(req.body)
  try {
    const savedCart = await newCart.save()
    res.status(200).json(savedCart)
  } catch (err) {
    res.status(500).json(err)
  }
})

//ACTUALIZAR
router.put("/:id",isAuthenticated,  async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json(updatedCart)
  } catch (err) {
    res.status(500).json(err)
  }
})

//BORRAR
router.delete("/:id",isAuthenticated,  async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...")
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get("/find/:userId",isAuthenticated,  async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
    res.status(200).json(cart)
  } catch (err) {
    res.status(500).json(err)
  }
});


//ALL
router.get("/carrito",isAuthenticated,  async (req, res) => {
  try {
    const carts = await Cart.find()
    res.status(200).json(carts)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router
