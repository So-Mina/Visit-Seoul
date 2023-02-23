const router = require('express').Router()
const isAuthenticated = require('../middlewares/isAuthenticated.js')
const isLoggedIn = require('../middlewares/isAuthenticated.js')
const Place = require('./../models/Post.model')
const User = require('./../models/User.model')
const Visit = require('./../models/To-visit.model')

 router.get('/to-visit', isLoggedIn, (req, res, next) => {
   res.render('to-visit')
 })

 router.post('/to-visit/:placeId', async (req, res, next) => {
  try {
    const marked = await Visit.findOne({post: req.params.placeId, user: req.session.currentUser._id})
    if (marked) {
      await Visit.findOneAndDelete({post: req.params.placeId, user: req.session.currentUser._id})
    } else {
      await Visit.create({post: req.params.placeId, user: req.session.currentUser._id})
    }
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
 })

module.exports = router
