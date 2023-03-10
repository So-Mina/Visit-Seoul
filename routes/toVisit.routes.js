const router = require('express').Router()
const isAuthenticated = require('../middlewares/isAuthenticated.js')
const isLoggedIn = require('../middlewares/isAuthenticated.js')
const Place = require('./../models/Post.model')
const User = require('./../models/User.model')
const Visit = require('./../models/To-visit.model')

 router.get('/to-visit', isLoggedIn, async (req, res, next) => {
  try {
   const allVisits = await Visit.find({user: req.session.currentUser._id}).populate('post')
   console.log('all favorites : ', allVisits)
   res.render('to-visit', {
   title: 'My To Visit',
   allVisits})
 } catch (error) {
   next (error)
  }
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
