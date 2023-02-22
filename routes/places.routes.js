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
  res.render('create', {
    title: 'Create a Place'
  });
});

router.post('/places/create', async(req, res, next) => {
  try {
    const {name, photo, address, area, smallDescription, description, recommended, latitude, longitude } = req.body
    console.log(req.body)
    await Place.create({
      name: name,
      photo: photo,
      address: address,
      area: area,
      smallDescription: smallDescription,
      description: description, 
      recommended: recommended ? true : false,
      location: { 
        type: 'Point',
        coordinates: [latitude, longitude] }})
    res.redirect('/places')
  } catch (error) {
    next(error)
  }
  
})

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