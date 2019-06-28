const router = require('express').Router()

// Import data models
const db = require('../data/testData')

//==== GET =====//
router.get('/', async (req, res) => {
  try {
    const data = db
    res.send(data)
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

//==== POST =====//
router.post('/', async (req, res) => {
  try {

  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router