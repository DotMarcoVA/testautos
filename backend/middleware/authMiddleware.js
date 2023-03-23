const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async(req,res,next)=> {
  // Declaracion del Token
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
      // Obtener el token del header
      token = req.headers.authorization.split(' ')[1]
      // Verificar la firma del token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // Obtener el usuario del token
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      console.log(error);
      res.status(401)
      throw new Error('Acceso no Autorizado para este Usuario')
    }
  }

  if(!token){
    res.status(401)
    throw new Error('Acceso no Autorizado. Verifique su usuario para continuar')
  }
})

module.exports = {
  protect
}