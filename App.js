const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const teacher = require("./models/Teacher")
const Students = require("./models/Student")

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/management").then((res) => {
    console.log("Mongoose Connected")
}).catch((err) => {
    console.log(err)

})


app.post("/teacher", async (req, res) => {
    const users = req.body.user

    let a = teacher({
        name: users.name,
        email: users.email,
        password: users.password,
        course: users.course
    })
    let result = await a.save()
    if (result) {
        res.json({
            status: true,
            msg: "Successfully Created",
            users: result
        })``
    }
    else {
        res.json({
            status: false,
            msg: "Failed To Create",
        })
    }

})

app.post("/studentsdata", async (req, res) => {
    const { value, courseFee, installment } = req.body

    let Studs = Students({
        name: value.name,
        email: value.email,
        password: value.password,
        course: value.course,
        courseFee,
        installmentDate1: installment.installmentDate1,
        installmentAmount1: installment.installmentAmount1,
        installmentDate2: installment.installmentDate2,
        installmentAmount2: installment.installmentAmount2,
        installmentDate3: installment.installmentDate3,
        installmentAmount3: installment.installmentAmount3,
    })
    console.log(req.body)
    let results = await Studs.save()
    if (results) {
        res.json({
            status: true,
            msg: "Successfully Created",
            result: results
        })
    }
    else {
        res.json({
            status: false,
            msg: "Failed To Create",
        })
    }
})


app.get("/messi", async (req, res) => {
    const students = await Students.find({})
    if (students) {
        res.json({
            status: true,
            messi: students,
            msg: "Done"
        })
    }
    else {
        res.json({
            status: false,
            msg: "Failed"
        })
    }
})

app.get("/users", async (req, res) => {
    const teachers = await teacher.find({})
    const teacherlength = await teacher.length
    if (teachers) {
        res.json({
            status: true,
            users: teachers,
            len: teacherlength
        })
    }
    else {
        res.json({
            status: false
        })
    }
})

app.post("/delete", async (req, res) => {
    const { item } = req.body
    const deleted = await Students.findOneAndDelete(item._id)
    if (deleted) {

        res.json({
            status: true,
            msg: `Successfully Deleted The ${item.name}`
        })
    }
    else {
        res.json({
            status: false
        })
    }
    // console.log(req.body)

})

// ==============edit
app.post("/edit", async (req, res) => {
    const editdata = await Students.findOneAndUpdate({ _id: req.body.edit._id }, {
        $set: {
            name: req.body.edit.name,
            email: req.body.edit.email,
            password: req.body.edit.password,
            course: req.body.edit.course,
            courseFee: req.body.edit
        }
    })
})



app.listen(8080, () => {
    console.log("Server Started At 8080")
})