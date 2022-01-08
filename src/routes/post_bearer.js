const Router = require('express').Router()
const path = require('path')
const Post_bearer = require(path.join(__dirname, '../model/post_bearer'))
const bodyParser = require('body-parser')
Router.use(bodyParser.json())
const auth = require(path.join(__dirname, '../middleware/auth'))

Router.get('/post_bearer', async (req, res) => {
    try {
        const post_bearer = await Post_bearer.find({})
        res.status(200).json(post_bearer)
    } catch (error) {
        res.status(500).json({ error: error.toString() })
    }
})

//add
Router.post('/post_bearer', auth, async (req, res) => {
    const { name, post } = req.body
    try {
        const post_bearer = new Post_bearer({
            name,
            post,
        })
        await post_bearer.save()
        res.status(201).json(post_bearer)
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
})

//edit
Router.put('/post_bearer/:id', auth, async (req, res) => {
    const { id } = req.params

    const { name, post } = req.body

    try {
        const post_bearer = await Post_bearer.findByIdAndUpdate(id, {
            name,
            post,
        })
        res.status(202).json(post_bearer)
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
})

//delete

Router.delete('/post_bearer/:id', auth, async (req, res) => {
    const { id } = req.params

    try {
        const post_bearer = await Post_bearer.findByIdAndDelete(id)
        res.status(202).json(post_bearer)
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
})

module.exports = Router
