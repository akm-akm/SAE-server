const path = require('path')
const User = require(path.join(__dirname, '../model/users'))
const express = require('express')
const passport = require('passport')
const router = express.Router()
const bcrypt = require('bcrypt')




router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const data = await User.findByCredentials({ email, password })

        res.status(202).json(data)
    } catch (error) {
        res.status(500).json({ error: error.toString() })
    }
})





router.get('/login', async (req, res) => {
    const a = await User.find({})
    res.json(a)
})

router.get('/login/profile',auth, async (req, res) => {
    try {
        const a = await User.find({ _id: req.user._id }).populate('Blog')
        res.status(200).json(a)
    } catch (error) {
        res.status(500).json({ error: error.toString() })
    }
})

router.delete('/login', async (req, res) => {
    const a = await User.deleteMany({})
    res.status(200).json(a)
})

module.exports = router
