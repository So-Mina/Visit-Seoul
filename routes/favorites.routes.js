const router = require('express').Router()
const isAuthenticated = require('../middlewares/isAuthenticated.js')
const isLoggedIn = require('../middlewares/isAuthenticated.js')
const Place = require('./../models/Post.model')
const User = require('./../models/User.model')
const Favorites = require('./../models/Favorites.model')

 router.get('/favorites', isLoggedIn, async (req, res, next) => {
   try {
    const allFavorites = await Favorites.find(req.session.currentUser._id).populate('post')
    console.log('all favorites : ', allFavorites)
    res.status(200).json(allFavorites)
  } catch (error) {
    next (error)
   }
 })

 router.post('/favorites/:placeId', async (req, res, next) => {
  try {
    const fav = await Favorites.findOne({post: req.params.placeId, user: req.session.currentUser._id})
    console.log(fav)
    if (fav) {
      await Favorites.findOneAndDelete({post: req.params.placeId, user: req.session.currentUser._id})
    } else {
      await Favorites.create({post: req.params.placeId, user: req.session.currentUser._id})
    }
    res.sendStatus(200)
  } catch (error) {
    next (error)
  }
 })


module.exports = router
