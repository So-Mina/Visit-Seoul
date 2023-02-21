const { Schema, model} = require('mongoose')

const postSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  address: {
    type: String,
    unique: true,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }, 
  smallDescription: {
    type: String,
    required: true
  },
  recommended: {
    type : Boolean,
  },
  location: { 
    type: { type: String }, 
    coordinates: [Number] 
  },
  openningHours: [{String}], // verify type with Google Api
  officialWebsite: {String}, // veitfy type with Google Api 
  displayMap: String, // verify type with Google Api
},
{
    timestamps: true,
})

postSchema.index({ location: '2dsphere' });

const Post = model("Post", postSchema)

module.exports = Post