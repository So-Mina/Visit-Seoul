const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_URI =
  process.env.MONGODB_URI

const Place = require('../models/post.model')
const Area = require("../models/Area.model")

const places = require("../seeds/places.json")
const areas = require("../seeds/areas.json")

console.log(process.env.MONGODB_URI)

mongoose
.set("strictQuery", false)
  .connect(MONGO_URI)
  .then(async (x) => {
    try {
      const dbName = x.connections[0].name
      console.log(`Connected to Mongo! Database name: "${dbName}"`)
      await Area.deleteMany()
      const allAreas = await Area.create(areas)
      await Place.deleteMany()

      for (const place of places) {
        console.log(place.area)
        const oneArea = await Area.findOne({name: place.area})
        place.area = oneArea._id
        place.location.coordinates.reverse()
      }
      await Place.create(places)
      await mongoose.disconnect()
      console.log('Disconnected after creating places')
    } catch (error) {
      console.error(error)
    }
  })
  .catch((err) => {
    console.error('Error connecting to mongo: ', err)
  })