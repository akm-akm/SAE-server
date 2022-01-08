const path = require('path')
const User = require(path.join(__dirname, '../model/users'))
const jwt = require('jsonwebtoken')

auth = async (req, res, next) => {
    try {
        if (req.header('Authorization') === String) {
            const token = await req
                .header('Authorization')
                .replace('Bearer ', '')

            const decoded = jwt.verify(token, process.env.jwtsecret)
            const user = await User.findOne({
                _id: decoded._id,
                'tokens.token': token,
            })

            if (!user) {
                throw new Error()
            }
            req.user = user
            req.token = token
            next()
        } else {
            throw new Error('no token')
        }
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate.' })
    }
}

module.exports = auth
