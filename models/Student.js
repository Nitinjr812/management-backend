const mongoose = require("mongoose")

const StudentsSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    course: String,
    courseFee: String,
    installmentDate1: String,
    installmentDate2: String,
    installmentDate3: String,
    installmentAmount1: String,
    installmentAmount2: String,
    installmentAmount3: String,
})
const Students = mongoose.model("Students", StudentsSchema)
module.exports = Students