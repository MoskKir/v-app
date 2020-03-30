const User = require('../model/user')

const auth = async function (req) {
    const user = await User.findByCredentials(req.name, req.password) 
    const token = await user.generateAuthToken() 
    
    return {user, token}
}

const add = async function (req) {
    const user = new User(req)
    await user.save()
    return user
}

const get = async function (req) {
    return await User.findById(req)
}

const getAll = async function () {
    return await User.find({})
}

const update = async function (req) {
    return await User.findByIdAndUpdate(req.id, req, { returnOriginal: false })
}

const del = async function (req) {
    return await User.findByIdAndDelete(req)
}

module.exports = {
    auth,
    add,
    get,
    update,
    del,
    getAll
}