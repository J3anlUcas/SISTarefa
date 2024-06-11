const express = require('express')
const route = express.Router()

const crudprojeto = require('../modules/Projeto/crudProjeto')

route.post("/project",crudprojeto.create)
route.delete("/project",crudprojeto.delete)

module.exports = route