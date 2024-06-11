const express = require('express')
const route = express.Router()

const crudprojeto = require('../modules/Projeto/crudProjeto')
const autenticaçãoToken = require('../middlewares/validarToken')

route.post("/project",autenticaçãoToken.validarToken, crudprojeto.create)
route.delete("/project",autenticaçãoToken.validarToken, crudprojeto.delete)
route.get("/projects", autenticaçãoToken.validarToken, crudprojeto.read)
route.put("/project", autenticaçãoToken.validarToken, crudprojeto.update)


module.exports = route