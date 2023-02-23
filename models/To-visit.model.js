const { Schema, model } = require('mongoose')
 
const toVisitSchema = new Schema ({
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

const ToVisit = model("ToVisit", toVisitSchema)

module.exports = ToVisit