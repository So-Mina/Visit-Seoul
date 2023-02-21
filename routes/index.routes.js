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

router.use('/', require('./auth.routes'))
router.use('/profile', require('./user.routes'))
router.use('/places', require('./places.routes'))

module.exports = router