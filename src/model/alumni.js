const mongoose = require('mongoose')

const alumni = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        current_job: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
        },
        gender: {
            type: String,
        },
        birthDay: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        passing_year: {
            type: Number,
            required: true,
        },
       
    },
    {
        timestamps: true,
    }
)

const Alumni = mongoose.model('Alumni', alumni)
module.exports = Alumni
