require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const routes = require('./src/routes/homeRoutes.js')
app.use(express.json())

const { SERVER_PORT } = process.env;

 app.set('views', path.resolve(__dirname, './src/views'))    
 app.set('view engine', 'ejs')

app.use(routes)

console.log(SERVER_PORT);

app.listen(SERVER_PORT, () => {
    console.log(`Servidor ON!🚀`)
})  