const express = require('express')
const path = require('path')
const User = require(path.join(__dirname, '../model/users'))
const router = express.Router()

router.post('/signup', async (req, res) => {
    const { email, password, name, birthDay, gender } = req.body
    try {
        const user = new User({
            email,
            password,
            name,
            gender,
            birthDay,
        })
        const users = await user.save()
        res.status(201).json(users)
    } catch (err) {
        res.status(501).json(err.message)
    }
})
module.exports = router
