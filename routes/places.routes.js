const express = require('express')
const router = express.Router()
const isAdmin = require('./../middlewares/isAdmin')
const Place = require('./../models/Post.model')
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

router.get('/places', async(req, res, next) => {
  try {
    const places = await Place.find()
    res.locals.isAdmin = req.session.currentUser?.userType === 'admin'; // Set isAdmin to true if the user is an admin
    res.render('places', {
      title : 'Places Page',
      places
    })
  } catch (error) {
    next(error)
  }
})

// create a new place
router.get('/create', isAdmin, (req, res, next) => {
  res.locals.isAdmin = true;
  res.render('create');
});

router.get('/places/:id', async(req, res, next) => {

  try {
    const { id } = req.params
    const place = await Place.findById(id)
    res.render('place-infos', {
      title: 'Place',
      place,
      GOOGLE_API_KEY,
    })
  } catch (error) {
    next(error)
  }
})

router.get('/places/:id/api', (req, res, next) => {
  console.log(req.params.id)
	Place.findOne({_id: req.params.id}, (error, place) => {
		if (error) { 
			next(error); 
		} else { 
			res.status(200).json({ place });
		}
	});
	});

module.exports = router