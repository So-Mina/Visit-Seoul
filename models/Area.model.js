const { Schema, model } = require('mongoose')
 
const areaSchema = new Schema ({
name: String
},
{
  timestamps: true,
})

const Area = model("Area", areaSchema)

module.exports = Area