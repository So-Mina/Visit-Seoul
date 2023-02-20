const router = require('express').Router()



router.get('/profile', (req, res, next) => {
  res.render('profile', {
    title : 'Profile page'
  })
})

router.get('/favorites', (req, res, next) => {
  res.render('favorites', {
    title: 'My Favorites'
  })
})

router.get('/to-visit', (req, res, next) => {
  res.render('to-visit', {
    title: 'My To Visit List'
  })
})

module.exports = router