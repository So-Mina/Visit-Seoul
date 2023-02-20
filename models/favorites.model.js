const { Schema, model } = require('mongoose')

const favoritesSchema = new Schema ({
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post"
  },
  user: {
    type: Schema.types.ObjectId,
    ref: "User"
  }
},
{
    timestamps: true,
})

const Favorites = model("Favorties", favoritesSchema)

module.exports = Favorites