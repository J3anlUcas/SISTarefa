const express = require('express')
const routes = express.Router()

const crudTarefas = require("../modules/Tarefas/crudTarefa")
const midwAutendicação = require("../middlewares/validarToken")


routes.post("/tarefa",midwAutendicação.validarToken, crudTarefas.createTarefa)
routes.post("/tarefa",midwAutendicação.validarToken, crudTarefas.addUsuarios)
routes.put("/tarefa", crudTarefas.update)
routes.delete("/tarefa", crudTarefas.delete)
routes.get("/tarefa", crudTarefas.read)


module.exports = routes