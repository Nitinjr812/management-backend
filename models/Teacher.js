const mongoose = require("mongoose")

const TeacherSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    course: String
})
const teacher = mongoose.model("Teachers", TeacherSchema)
module.exports = teacher