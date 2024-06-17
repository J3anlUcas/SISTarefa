const express = require('express')
const routes = express.Router()

const crudTarefas = require("../modules/Tarefas/crudTarefa")
const midwAutendicação = require("../middlewares/validarToken")


routes.post("/tarefa",midwAutendicação.validarToken, crudTarefas.createTarefa)
routes.post("/tarefa",midwAutendicação.validarToken, crudTarefas.addUsuarios)
routes.put("/tarefa", midwAutendicação.validarToken,crudTarefas.update)
routes.delete("/tarefa", midwAutendicação.validarToken,crudTarefas.delete)
routes.get("/tarefa", midwAutendicação.validarToken,crudTarefas.read)


module.exports = routes