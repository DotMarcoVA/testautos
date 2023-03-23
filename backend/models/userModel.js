const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Introduce un nombre']
  },
  email: {
    type: String,
    required: [true, 'Introduce un correo electronico'],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Ingresa tu contraseña correctamente"]
  }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)