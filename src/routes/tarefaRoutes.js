const express = require('express')
const routes = express.Router()

const crudTarefas = require("../modules/Tarefas/crudTarefa")
const midwAutendicação = require("../middlewares/validarToken")


routes.post("/tarefa",midwAutendicação.validarToken, crudTarefas.create)

module.exports = routes