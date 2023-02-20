require('dotenv').config()

const express = require('express')
const hbs = require('hbs')

const app = express()

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))

const indexRoutes = require('./routes/index.routes')
app.use('/', indexRoutes)


module.exports = app;
