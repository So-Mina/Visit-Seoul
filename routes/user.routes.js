const router = require('express').Router()
const isAuthenticated = require('../middlewares/isAuthenticated.js')
const isLoggedIn = require('../middlewares/isAuthenticated.js')
const bcrypt = require('bcryptjs')


const User = require('./../models/User.model')

router.get('/profile', isAuthenticated, (req, res, next) => {
  res.render('profile', {
    title : 'My Profile page',
    css: ['profile']
  })
})

// // redirect on the edit profile page
// router.get('/edit-profile', isAuthenticated, async (req, res, next) => {
//   try {
//     const userToUpdate = await User.findById(req.params.id)
// 
//   res.render('edit-profile', {
//   title : 'Edit your profile',
//   user : userToUpdate})
//   } catch (error) {
//     next (error)
//   }
// })
// 
// // submit the changes and go back to profile page

// router.get('/favorites', isLoggedIn, (req, res, next) => {
//   res.render('favorites', {
//     title: 'My Favorites'
//   })
// })

router.get('/to-visit', isLoggedIn, (req, res, next) => {
  res.render('to-visit', {
    title: 'My To Visit List'
  })
})

router.post("/:id/delete", async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    req.session.destroy((error) => {
      if (error) {
        return next(error)
      }
      res.redirect('/sign-up')
    })
  } catch (error) {
    next(error)
  }
})

router.post('/profile', isLoggedIn, async(req, res, next) => {
  const {currentPassword, newPassword} = req.body
  console.log(currentPassword, newPassword)
 
  try {
    const foundUser = await User.findById(req.session.currentUser._id, {password: 1})
    const matchingPass = await bcrypt.compare(currentPassword, foundUser.password)

    if(!matchingPass){
      return res.render('profile', {errorMessage: 'Password incorrect'})
    }

    const hashPassword = await bcrypt.hash(newPassword, 10)
    const updatedUser = await User.findByIdAndUpdate(req.session.currentUser._id, {password: hashPassword}, {new: true})
    req.session.destroy((error) => {
      if (error) {
        return next(error)
      }
      res.redirect('/log-in')
    })

  } catch (error) {
    next(error)
  }
})

// Save changes

module.exports = router