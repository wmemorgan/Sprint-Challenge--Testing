const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

// Import resource routes

// Instantiate server
const server = express()

// Load middleware

// Route handling
server.use('/', (req, res) => {
  res.json({ status: 'up' })
})

module.exports = server
