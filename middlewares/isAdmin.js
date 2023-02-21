function isAdmin(req, res, next) {
  if (!req.session.currentUser) {
    return res.redirect('/')
  }
  if (req.session.currentUser.userType === 'admin') {
    res.locals.isAdmin = true; // Set isAdmin to true in res.locals
    next()
  } else {
    res.redirect('/')
  }
}

module.exports = isAdmin