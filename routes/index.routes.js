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
router.use('/', require('./user.routes'))
router.use('/', require('./places.routes'))
router.use('/', require('./favorites.routes'))
router.use('/', require('./toVisit.routes'))

module.exports = router