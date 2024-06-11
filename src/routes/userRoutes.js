const express = require('express')
const route = express.Router()

const crudUser = require('../modules/Usuarios/crudUsuario')
const autendicação = require('../controllers/AuthController')
const validaçãoToken = require('../middlewares/validarToken')



route.post("/login", autendicação.login)

route.post("/singUP", validaçãoToken.validarToken, crudUser.creat)
route.delete("/user", validaçãoToken.validarToken, crudUser.delete)
route.get("/users", validaçãoToken.validarToken, crudUser.read)
route.put("/user", validaçãoToken.validarToken, crudUser.update)

module.exports = route