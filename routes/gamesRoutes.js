const router = require('express').Router()

// Import data models
let db = require('../data/testData')

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

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const data = db[id-1]
    if (data) {
      res.send(data)
    } else {
      res.status(404).json({ message: `record not found` })
    }

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

//==== DELETE ====//
router.delete('/:id', (req, res) => {
  const { id } = req.params
  const foundGame = db.find(game => game.id == id)

  if(foundGame) {
    db = db.filter(game => game.id !== Number(id))
    res.json({ message: `Successfully deleted record number ${id}` })
  } else {
    res.status(404).json({ message: `record not found` })
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