const express = require('express')
const route = express.Router()
const crudUser = require('../modules/Usuarios/crudUsuario')

route.post("/singUP", crudUser.creat)
route.delete("/user", crudUser.delete)
route.get("/users",crudUser.read)
route.put("/user",crudUser.update)

module.exports = route