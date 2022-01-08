const mongoose = require('mongoose');   
const inductees = new mongoose.Schema(
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
        department: {
            type: String,
            required: true,
        },
        batch: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
        },
        about: {
            type: String,
        },
        birthDay: {
            type: String,
        },
        Gender: {
            type: String,
        },

        strength: {
            type: String,
        },
        weakness: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

module.exports=new mongoose.model('Induction2021Round1',inductees);