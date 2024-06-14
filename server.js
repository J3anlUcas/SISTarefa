//dependencias
require('dotenv').config()
const express = require('express')
const path = require('path')
const swaggerUi = require('swagger-ui-express')

//impotações
const swaggerJson = require('./swagger.json')
const home = require('./src/routes/homeRoutes.js')
const user = require('./src/routes/userRoutes.js')
const project = require('./src/routes/projetoRutes.js')
//middwares
const app = express()
app.use(express.json())
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerJson))
//renderizando paginas no servidpr
app.set('views', path.resolve(__dirname, './src/views'))
app.set('view engine', 'ejs')

//use rotas
app.use(home)
app.use(user)
app.use(project)

//ligando o servidor
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor ON!🚀`)
})    