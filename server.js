//dependencias
require('dotenv').config()
const express = require('express')
const path = require('path')

//impotações
const home = require('./src/routes/homeRoutes.js')
const user = require('./src/routes/userRoutes.js')

//middwares
const app = express()
app.use(express.json())

//renderizando paginas no servidpr
app.set('views', path.resolve(__dirname, './src/views'))
app.set('view engine', 'ejs')

//use rotas
app.use(home)
app.use(user)

//ligando o servidor
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor ON!🚀`)
})  