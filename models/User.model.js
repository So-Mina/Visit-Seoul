const { schema, model } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  mail: { 
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  photo: String,
  about: String,
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: "Favorites"
  }],
  toVisitList: [{
    type: Schema.Types.ObjectId,
    ref: "toVisit"
  }]
},
{
    timestamps: true,
})

const User = model("User", userSchema)

module.exports = User