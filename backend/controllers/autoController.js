const asycnHandler = require('express-async-handler')
const Auto = require('../models/autoModel')

const getAutos = asycnHandler(async (req, res)=> {
  const autos = await Auto.find({user: req.user.id})
  res.status(200).json(autos)
})

const setAutos = asycnHandler(async (req, res)=> {
  const {marca, modelo, anio, color} = req.body;
  if(!marca || !modelo || !anio || !color){
    res.status(400)
    throw new Error('Verificar que todos los campos esten correctamente llenados')
  }

  const auto = await Auto.create({
    marca,
    modelo,
    anio,
    color,
    user: req.user.id
  })

  res.status(201).json(auto)
})

const updateAutos = asycnHandler(async (req, res)=> {
  const auto = await Auto.findById(req.params.id)

  if(!auto){
    res.status(400)
    throw new Error('No se ha encontrado el auto especificado')
  }

  // Verificar que este auto pertenezca al mismo usuario del token
  if(auto.user.toString() !== req.user.id){
    res.status(400)
    throw new Error('Acceso no autorizado para este usuario')
  }

  const autoModificado = await Auto.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.status(200).json(autoModificado)
})

const deleteAutos = asycnHandler(async (req,res)=> {
  const auto = await Auto.findById(req.params.id)
  if(!auto){
    res.status(400)
    throw new Error('No se ha encontrado el auto especificado')
  }

  // Verificar que este auto pertenezca al mismo usuario del token
  if(auto.user.toString() !== req.user.id){
    res.status(400)
    throw new Error('Acceso no autorizado para este usuario')
  }

  const autoEliminado = await Auto.findByIdAndDelete(req.params.id)
  res.status(200).json({mensaje: `Se ha eliminado el auto con id ${req.params.id}`, autoEliminado})
})


module.exports = {
  getAutos,
  setAutos,
  updateAutos,
  deleteAutos
}