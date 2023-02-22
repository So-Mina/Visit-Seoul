const router = require('express').Router()
const isAuthenticated = require('../middlewares/isAuthenticated.js')
const isLoggedIn = require('../middlewares/isAuthenticated.js')
const Place = require('./../models/Post.model')
const User = require('./../models/User.model')
const Favorites = require('./../models/Favorites.model')

// view user's favorites
router.get('/favorites', isAuthenticated, async (req, res) => {
  const userId = req.session.currentUser._id

  try {
    // find all favorite records for the user
    const favorites = await Favorites.find({ user: userId }).populate('post')

    res.render('favorites', { favorites })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// add a place to favorites
router.post('/favorites/add/:placeId', isAuthenticated, async (req, res) => {
  const userId = req.session.currentUser._id
  const placeId = req.params.placeId

  try {
    // check if the place is already in favorites
    const existingFavorite = await Favorites.findOne({ user: userId, post: placeId })

    if (existingFavorite) {
      return res.status(400).json({ message: 'Place already in favorites' })
    }

    // create a new favorite record
    const newFavorite = new Favorites({ user: userId, post: placeId })
    await newFavorite.save()

    res.status(200).json({ message: 'Place added to favorites' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
});

// remove a place from favorites
router.post('/favorites/remove/:placeId', isAuthenticated, async (req, res) => {
  const userId = req.session.currentUser._id
  const placeId = req.params.placeId

  try {
    // check if the place is in favorites
    const existingFavorite = await Favorites.findOne({ user: userId, post: placeId })

    if (!existingFavorite) {
      return res.status(400).json({ message: 'Place not in favorites' })
    }

    // remove the favorite record
    await existingFavorite.remove()

    res.status(200).json({ message: 'Place removed from favorites' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router