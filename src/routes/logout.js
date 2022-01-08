const express = require('express')
const router = express.Router()

router.get('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).json({ message: 'logout success' })
    } catch (error) {
     
        res.status(500).json({ error: error.toString() })
    }
})

module.exports = router
