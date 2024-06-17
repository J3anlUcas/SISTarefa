const express = require('express')
const route = express.Router()

const crudUser = require('../modules/Usuarios/crudUsuario')

const validaçãoToken = require('../middlewares/validarToken')
const autendicação = require('../controllers/AuthController')
const userController = require('../controllers/UserController')


//TOKEN
route.post("/login", autendicação.login)
//CRUD
route.post("/users", crudUser.creat)
route.delete("/users", validaçãoToken.validarToken, crudUser.delete)
route.get("/users", validaçãoToken.validarToken, crudUser.read)
route.put("/users", validaçãoToken.validarToken, crudUser.update)

//RELATORIO
route.get("/usuarios", userController.users)



module.exports = route