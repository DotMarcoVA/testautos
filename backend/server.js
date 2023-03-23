const express = require ('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000;
const colors = require('colors')
const connectDB = require('./config/db')
var cors = require('cors')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(cors())

app.use('/api/autos', require('./routes/autosRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, ()=> console.log("Servidor corriendo en el puerto ",port))