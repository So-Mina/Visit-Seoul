const router = require('express').Router()
const isAuthenticated = require('../middlewares/isAuthenticated.js')
const isLoggedIn = require('../middlewares/isAuthenticated.js')
const Place = require('./../models/Post.model')
const User = require('./../models/User.model')
const Favorites = require('./../models/Favorites.model')

 router.get('/favorites', isLoggedIn, (req, res, next) => {
   res.render('favorites')
 })


 router.post('/favorites/:placeId', async (req, res, next) => {
  try {
    const fav = await Favorites.findOne({post: req.params.placeId, user: req.session.currentUser._id})
    if (fav) {
      await Favorites.findOneAndDelete({post: req.params.placeId, user: req.session.currentUser._id})
    } else {
      await Favorites.create({post: req.params.placeId, user: req.session.currentUser._id})
    }
    res.sendStatus(200)
  } catch (error) {
    
  }
 })


module.exports = router
