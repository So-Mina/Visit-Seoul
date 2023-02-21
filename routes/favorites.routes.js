const express = require('express')
const router = express.Router()
const Place = require('./../models/Post.model')

router.get('/', async(req, res, next) => {
  try {
    const places = await Place.find()
    res.render('favorites', {
      title : 'Favorites',
      favorites
    })
  } catch (error) {
    
  }
  
})