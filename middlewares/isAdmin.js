function isAdmin(req, res, next) {
    console.log(req.session.currentUser.userType)
    if (!req.session.currentUser) {
        return res.redirect('/')
      }
    if(req.session.currentUser.userType === 'admin'){
      next()
    } else {
      res.redirect('/')
    }
  }

  module.exports = isAdmin