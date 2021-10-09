'use strict'
require('dotenv').config()
const express = require('express')

const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const Routes = require('./src/routes')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))

// process.env.FULL_FILEPATH = __dirname + '/'+process.env.FILEPATH

Routes(app)

// const db = require('./server/models')
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log('Drop and re-sync db.')
// })

const server = require('http').createServer(app) 
const PORT = process.env.PORT || process.env.APP_PORT
if (!module.parent) {
	server.listen(PORT, () => {
		console.log('Express Server Now Running. port:'+PORT)
	})
}
module.exports = app