require('dotenv').config()

const express = require('express')
const hbs = require('hbs')

const app = express()

require('./db')

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))

const indexRoutes = require('./routes/index.routes')
app.use('/', indexRoutes)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})


module.exports = app;