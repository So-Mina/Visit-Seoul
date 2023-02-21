const express = require('express')
const User = require('../models/User.model')
const router = express.Router()
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

router.get('/sign-up', async (req, res, next) => {
  res.render('auth/sign-up', {
    title: 'Sign up Page'
  })
})

router.post('/sign-up', async (req, res, next) => {

  // const { username, mail, password } = req.body

  try {
    // const { username, mail, password } = req.body
    const username = req.body.username
    const mail = req.body.mail
    const password = req.body.password

    if (!username || !mail || !password) {
      return res.render('auth/sign-up', { errorMessage: 'Something is missing!' })
    }
    if (password.length < 8) {
      return res.render('auth/sign-up', { errorMessage: 'Oops... password should be at least 8 characters!' })
    }

    const foundUser = await User.findOne({ username: username })
    if (foundUser) {
      return res.render('auth/sign-up', { errorMessage: 'Find yourself another name!' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const userToCreate = {
      username,
      mail,
      password: hashedPassword
    }
    const userFromDb = User.create(userToCreate)

    res.redirect('/log-in')

  } catch (error) {
    next(error)
  }
})

router.get('/log-in', (req, res, next) => {
  res.render('auth/log-in', {
    title: 'log in Page'
  })
})

router.post('/log-in', async (req, res, next) => {
  const { username, mail, password } = req.body

  try {
    if (!username || !mail || !password) {
      return res.render('auth/log-in', { errorMessage: 'Something is missing!' })
    }

    const foundUser = await User.findOne(
      { username },
      { password: 1, username: 1, mail: 1 }
    )
    if (!foundUser) {
      return res.render('auth/log-in', { errorMessage: 'Not found, register yourself first!' })
    }

    const matchingPass = await bcrypt.compare(password, foundUser.password)
    if (!matchingPass) {
      return res.render('auth/log-in', { errorMessage: 'Something is wrong with the password..' })
    }

    req.session.currentUser = foundUser
    res.redirect('/profile')

  } catch (error) {
    next(error)
  }
})

router.get('/log-out', (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return next(error)
    }
    res.redirect('/log-in')
  })
})

module.exports = router 