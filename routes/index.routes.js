const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  try {
    res.render('main', { title: 'Home Page' })
  } catch (error) {
    next(error)
  }
})


module.exports = router