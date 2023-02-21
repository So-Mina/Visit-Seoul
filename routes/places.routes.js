const express = require('express')
const router = express.Router()
const Place = require('./../models/post.model')

router.get('/places', async(req, res, next) => {
  try {
    const places = await Place.find()
    res.render('places', {
      title : 'Places Page',
      places
    })
  } catch (error) {
    next(error)
  }
  
})


router.get('/places/:id', async(req, res, next) => {
  try {
    const { id } = req.params
    const place = await Place.findById(id)
    res.render('place-infos', {
      title: `${place.name}`,
      place
    })
  } catch (error) {
    next(error)
  }
})


module.exports = router