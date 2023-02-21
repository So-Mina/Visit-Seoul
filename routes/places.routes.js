const express = require('express')
const router = express.Router()

const Place = require('./../models/Post.model')
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

router.get('/', async(req, res, next) => {
  try {
    const places = await Place.find()
    res.render('places', {
      title : 'Places Page',
      places
    })
  } catch (error) {
    next(error)
  }
})


router.get('/:id', async(req, res, next) => {

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


router.get('/:id/api', (req, res, next) => {
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