const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

// Import resource routes
const gamesRoutes = require('../routes/gamesRoutes')

// Instantiate server
const server = express()

// Load middleware
server.use(helmet())
server.use(cors())
server.use(express.json())


// Route handling
server.use('/games', gamesRoutes)
server.use('/', (req, res) => {
  res.json({ status: 'up' })
})

module.exports = server
