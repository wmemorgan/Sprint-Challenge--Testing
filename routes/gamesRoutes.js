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
const requiredFields = ['title', 'genre']
router.post('/', requiredData(inputDataChecker, requiredFields), async (req, res) => {
  try {
    const titles = db.map(game => game.title.toLowerCase())
    const id = db.length + 1
    const newData = {
      id,
      ...req.body
    }
    const isDuplicate = titles.includes(newData.title.toLowerCase())

    if (isDuplicate) {
      res.status(405).json({ message: `Duplicate title exists` })
    } else {
      db.push(newData)
      const data = db[id - 1]
      res.status(201).send(data)
    }
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

// Custom Middleware
function inputDataChecker (arr, target) {
  return target.every(v => arr.includes(v))
}

function requiredData (dataChecker, dataFields)  {
  return function (req, res, next) {
    if (!dataChecker(Object.keys(req.body), dataFields)) {
      res.status(422).json({ message: 'Missing required field' })
    } else {
      next()
    }
  }
}

module.exports = router