const express = require('express')
const UserController = require('../controllers/user-controller')
const user_controller = new UserController()

const router = new express.Router()

router.get('/', user_controller.getIndex)
router.delete('/api/users/:id', user_controller.deleteUser)
router.post('/api/users/',user_controller.addUser)
router.put('/api/users/', user_controller.updateUser)
router.get('/api/users/:id', user_controller.getUser)
router.get('/api/users/', user_controller.getAllUser)

module.exports = router