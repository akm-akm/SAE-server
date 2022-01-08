const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { use } = require('passport/lib')
const users = new mongoose.Schema(
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
        password: {
            type: String,
            required: true,
        },
        birthDay: {
            type: String,
        },
        gender: {
            type: String,
        },
        phone: {
            type: Number,
        },
        about: {
            type: String,
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
)

users.virtual('blogs', {
    ref: 'Blog',
    localField: '_id',
    foreignField: 'author',
})
users.methods.toJSON = function () {
    const user = this.toObject()
    delete user.password
    delete user.tokens
    delete user.__v
    return user
}

users.methods.jwtToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.jwtsecret, {
        expiresIn: '30d',
    })
    this.tokens = this.tokens.concat({ token })
    return token
}

users.pre('save', function () {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 8)
    }
    //  this.token = this.jwtToken()
})

users.statics.findByCredentials = async ({ email, password }) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('unknown user')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('wrong password')
    }
    const token = user.jwtToken()
    console.log(token)
    user.save()
    return { user, token }
}

const User = mongoose.model('User', users)
module.exports = User
