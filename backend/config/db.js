const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Base de Datos Mongo conectada: ${conn.connection.host}`.rainbow);
  } catch (error) {
    
  }
}

module.exports = connectDB;