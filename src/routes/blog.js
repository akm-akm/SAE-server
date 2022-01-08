const Router = require('express').Router()
const path = require('path')
const Blog = require(path.join(__dirname, '../model/blog'))
const auth = require(path.join(__dirname, '../middleware/auth'))
const bodyParser = require('body-parser')
Router.use(bodyParser.json())

Router.post('/blog', auth, async (req, res) => {
    const { title, content, author } = req.body

    const blog = new Blog({
        title,
        content,
        author: req.user._id,
    })

    try {
        await blog.save()
        res.status(201).json(blog)
    } catch (error) {
        res.status(500).json({ error: error.toString() })
    }
})

Router.delete('/blog/:id', auth, async (req, res) => {
    const { id } = req.params

    try {
        const blog = await Blog.findByIdAndUpdate({ id, owner: req.user._id })
        res.status(202).json(blog)
    } catch (error) {
        res.status(500).json({ error: error.toString() })
    }
})

// update a blog
Router.put('/blog/:id', auth, async (req, res) => {
    const { id } = req.params
    const { title, content } = req.body

    try {
        const blog = await Blog.findByIdAndUpdate(id, {
            title,
            content,
        })
        res.status(201).json(blog)
    } catch (error) {
        res.status(500).json({ error: error.toString() })
    }
})

// get all blogs

Router.get('/blog', async (req, res) => {
    try {
        const blogs = await Blog.find({})
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json({ error: error.toString() })
    }
})

Router.get('/blog/:id',auth, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author')

        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json({ error: error.toString() })
    }
})
module.exports = Router
