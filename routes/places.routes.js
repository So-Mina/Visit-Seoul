const express = require('express')
const Favorites = require('../models/Favorites.model')
const Visit = require('../models/To-visit.model')
const Area = require('../models/Area.model')
const router = express.Router()
const isAdmin = require('./../middlewares/isAdmin')
const Place = require('./../models/Post.model')
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

router.get('/places', async(req, res, next) => {
  try {
    const places = await Place.find()
    res.locals.isAdmin = req.session.currentUser?.userType === 'admin' // Set isAdmin to true if the user is an admin
    res.render('places', {
      title : 'Places Page',
      places
    })
  } catch (error) {
    next(error)
  }
})

// create a new place
router.get('/create', isAdmin, async (req, res, next) => {
  res.locals.isAdmin = true;
  const areas = await Area.find()

  res.render('create', {
    title: 'Create a Place',
    css: ['editcreate'],
    areas
  });
});

router.post('/places/create', async(req, res, next) => {
  try {
    const {name, photo, address, area, smallDescription, description, recommended, officialWebsite, latitude, longitude } = req.body
    console.log(req.body)

    await Place.create({
      name: name,
      photo: photo,
      address: address,
      area: area,
      smallDescription: smallDescription,
      description: description, 
      recommended: recommended ? true : false,
      officialWebsite: officialWebsite,
      location: { 
        type: 'Point',
        coordinates: [longitude, latitude] }})
    res.redirect('/places')
  } catch (error) {
    next(error)
  }
  
})

router.get('/places/:id', async(req, res, next) => {

  try {
    const { id } = req.params
    const place = await Place.findById(id).populate('area')
    let isFav = null, isMarked = null
    if(req.session.currentUser) {
      isFav = await Favorites.findOne({post: id, user: req.session.currentUser._id})
      isMarked = await Visit.findOne({post: id, user: req.session.currentUser._id})
    }
    res.locals.isAdmin = req.session.currentUser?.userType === 'admin'
console.log(place.officialWebsite)
    res.render('place-infos', {
      title: 'Place',
      place,
      GOOGLE_API_KEY,
      isFav,
      isMarked
    })
  } catch (error) {
    next(error)
  }
})

router.post("/places/:id/delete", isAdmin, async (req, res, next) => {
  res.locals.isAdmin = true;
  try {
    await Place.findByIdAndDelete(req.params.id)
    res.redirect('/places')
  } catch (error) {
    next(error)
  }
})

router.get("/places/:id/edit", isAdmin, async(req, res, next) => {
  try {
    const place = await Place.findById(req.params.id).populate('area')
    const areas = await Area.find({_id: {$ne: place.area}})
    console.log(place)
    res.locals.isAdmin = req.session.currentUser?.userType === 'admin';
    res.render('edit-place', {
      title: "Edit Place infos",
      css: ['editcreate'],
      areas,
      place
    })
  } catch (error) {
    next(error)
  }
})

router.post("/places/:id/edit", async(req, res, next) => {
  try {
    const {name, photo, address, area, smallDescription, description, recommended, officialWebsite, latitude, longitude } = req.body
    console.log("edit place info", req.body)
    await Place.findByIdAndUpdate(req.params.id, {
      name: name,
      photo: photo,
      address: address,
      area: area,
      smallDescription: smallDescription,
      description: description, 
      recommended: recommended ? true : false,
      officialWebsite: officialWebsite,
      location: { 
        type: 'Point',
        coordinates: [longitude, latitude] }}, { new: true })
    res.redirect('/places')
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