const Router = require('express').Router()
const path = require('path')
const Alumni = require(path.join(__dirname, '../model/alumni'))
const auth = require(path.join(__dirname, '../middleware/auth'))
const bodyParser = require('body-parser')
Router.use(bodyParser.json())

Router.get('/alumni', async (req, res) => {
    try {
        const alumni = await Alumni.find({})
        res.status(200).json(alumni)
    } catch (error) {
        res.status(500).json({ error: error.toString() })
    }
})

//add
Router.post('/alumni', auth, async (req, res) => {
    const { name, current_job, phone, email, passing_year, gender, birthDay } =
        req.body

    const alumni = new Alumni({
        name,
        current_job,
        phone,
        email,
        passing_year,
        gender,
        birthDay,
    })

    try {
        await alumni.save()
        res.status(201).json(alumni)
    } catch (error) {
        res.status(500).json({ error: error.toString() })
    }
})

//edit
Router.put('/alumni/:id', auth, async (req, res) => {
    const { id } = req.params

    const { name, current_job, phone, email, passing_year, gender, birthDay } =
        req.body

    try {
        const alumni = await Alumni.findByIdAndUpdate(id, {
            name,
            current_job,
            phone,
            email,
            passing_year,
            gender,
            birthDay,
        })
        res.status(202).json(alumni)
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
})

//delete

Router.delete('/alumni/:id', auth, async (req, res) => {
    const { id } = req.params

    try {
        const alumni = await Alumni.findByIdAndDelete(id)
        res.status(202).json(alumni)
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
})

module.exports = Router
