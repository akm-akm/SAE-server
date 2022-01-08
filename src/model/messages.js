const mongoose = require('mongoose');

const message = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        message: {
            type: String,
            required: true,
        },

        phone: {
            type: Number,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        messageRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Message', message);