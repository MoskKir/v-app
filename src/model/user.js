const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique:true,
        required: true,
        trim: true
    },
    age: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: false,
        minlength: 1,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: false
        }
    }],
})

userSchema.statics.findByCredentials = async (login, password) => {    
    const user = await User.findOne({name: login})

    if(!user) {
        throw new Error('Unable user')
    }
    
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User