const express = require('express')
const router = express.Router()

router.get('/places', (req, res, next) => {
  res.render('places', {
    title : 'Places Page'
  })
})



module.exports = router