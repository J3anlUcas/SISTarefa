const express = require('express')
const route = express.Router()

const crudUser = require('../modules/Usuarios/crudUsuario')

const validaçãoToken = require('../middlewares/validarToken')
const autendicação = require('../controllers/AuthController')
const userController = require('../controllers/UserController')


//TOKEN
route.post("/login", autendicação.login)
//CRUD
route.post("/singUP", validaçãoToken.validarToken, crudUser.creat)
route.delete("/user", validaçãoToken.validarToken, crudUser.delete)
route.get("/users", validaçãoToken.validarToken, crudUser.read)
route.put("/user", validaçãoToken.validarToken, crudUser.update)

//RELATORIO
route.get("/usuarios", userController.users)



module.exports = route