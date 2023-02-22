const express = require('express')
const router = express.Router()
const Place = require("./../models/Post.model")

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const recoPlaces = await Place.find({recommended: true})
    res.render('main', { title: 'Home Page' , recoPlaces})
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