const express = require('express')
const UserController = require('../controllers/user-controller')
const auth = require('../middleware/auth')

const user_controller = new UserController()

const router = new express.Router()

router.get('/', auth, user_controller.getIndex)
router.delete('/api/users/:id', auth, user_controller.deleteUser)
router.post('/api/users/', auth, user_controller.addUser)
router.put('/api/users/', auth, user_controller.updateUser)
router.get('/api/users/:id', auth, user_controller.getUser)
router.get('/api/users/', auth, user_controller.getAllUser)

// auth
router.post('/login', user_controller.auth)

module.exports = router