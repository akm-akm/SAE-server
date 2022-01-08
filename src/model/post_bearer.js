const mongoose = require('mongoose')
const post_bearer = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        post: {
            type: String,
        },
        details: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Members',
        },
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model('Post_bearer', post_bearer)
