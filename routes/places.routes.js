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
    
  }
  
})





module.exports = router