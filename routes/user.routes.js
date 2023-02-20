const router = require('express').Router()
const isAuthenticated = require('../middlewares/isAuthenticated.js')
const isLoggedIn = require('../middlewares/isAuthenticated.js')


router.get('/profile', isAuthenticated, (req, res, next) => {
  res.render('profile', {
    title : 'Profile page'
  })
})

router.get('/favorites', isLoggedIn, (req, res, next) => {
  res.render('favorites', {
    title: 'My Favorites'
  })
})

router.get('/to-visit', isLoggedIn, (req, res, next) => {
  res.render('to-visit', {
    title: 'My To Visit List'
  })
})

module.exports = router