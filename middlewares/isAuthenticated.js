function isAuthenticated(req, res, next) {
  if (req.session.currentUser) {
    next()
  } else {
    res.redirect('/log-in')
  }
}

module.exports = isAuthenticated