const mongoose = require('mongoose'), Schema = mongoose.Schema
var SquadSchema = new Schema({
    name: String,
    id: Number,
    lessonId: [{type:Schema.Types.ObjectId, ref:"Lesson"}],
    cohort: String
})
const Squad = mongoose.model('Squad', SquadSchema)
module.exports={Squad}