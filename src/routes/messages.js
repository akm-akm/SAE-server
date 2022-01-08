const Router = require('express').Router()
const path = require('path')
const Messages = require(path.join(__dirname, '../model/messages'))
const bodyParser = require('body-parser')
Router.use(bodyParser.json())
const auth = require(path.join(__dirname, '../middleware/auth'))

// insert a messages
Router.post('/contact', async (req, res) => {
    const { name, description, phone, email, is_student } = req.body

    const messages = new Messages({
        name,
        description,
        phone,
        email,
        is_student,
        subject,
    })
    try {
        await messages.save()
        res.status(201).json(messages)
    } catch (error) {
        res.status(500).json({ error: error.toString() })
    }
})

// toggle read and unread
Router.put('/contact/:id', auth, async (req, res) => {
    const { id } = req.params
    const { case_closed } = req.body

    try {
        const messages = await Messages.findByIdAndUpdate(id, {
            case_closed,
        })
        res.status(202).json(messages)
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
})
//delete a messages//
Router.delete('/contact/:id', auth, async (req, res) => {
    const { id } = req.params
    try {
        const messages = await Messages.findByIdAndDelete(id)
        res.status(202).json(messages)
    } catch (error) {
        res.status(500).json({ error: error.toString() })
    }
})

//get all messages
Router.get('/contact', auth, async (req, res) => {
    try {
        const messages = await Messages.find({})
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({ error: error.toString() })
    }
})

module.exports = Router
