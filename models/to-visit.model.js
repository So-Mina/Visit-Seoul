const { schema, model } = require('mongoose')

const toVisitSchema = new Schema ({
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post"
  },
  user: {
    type: Schema.types.ObjectId,
    ref: "User"
  },
  note: String
},
{
    timestamps: true,
})

const ToVisit = model("ToVisit", toVisitSchema)

module.exports = ToVisit