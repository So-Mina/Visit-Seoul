const { Schema, model } = require('mongoose')
 
const favoritesSchema = new Schema ({
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
},
{
  timestamps: true,
})

const Favorites = model("Favorites", favoritesSchema)

module.exports = Favorites