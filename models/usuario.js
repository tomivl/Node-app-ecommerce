const mongoose = require('mongoose') 
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')


//MODELO DE USUARIO DE LA BASE DE DATOS
const UserSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  date: {type: Date, default: Date.now}
})
// ENCRIPTA LA CONTRASEÑA DEL USUARIO
UserSchema.methods.encryptPassword = async (password) => {
const salt = await bcrypt.genSalt(10)
const hash = bcrypt.hash(password, salt)
return hash
}
//CHEQUEA QUE COINCIDA LA CONTRASEÑA 
UserSchema.methods.matchPassword = async function (password){
  return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('Usuario', UserSchema)