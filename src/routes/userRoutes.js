const express = require('express')
const route = express.Router()
const crudUser = require('../modules/Usuarios/crudUsuario')

route.post("/singUP", crudUser.create)
route.delete("/user", crudUser.delete)

module.exports = route