const mongoose = require('mongoose')

const autoSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  marca: {
    type: String,
    required: [true, 'Introduce la Marca']
  },
  modelo: {
    type: String,
    required: [true, 'Introduce el Modelo']
  },
  anio: {
    type: Number,
    required: [true, 'Introduce el Año']
  },
  color: {
    type: String,
    required: [true, 'Introduce el Color']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Auto', autoSchema)