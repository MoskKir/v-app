const service = require('../services/user-service')
const colors = require('colors')

class UserController {
    constructor () {}
    auth = async (req, res) => {
        try {
            // console.log(req.body)
            const result = await service.auth(req.body)
            res.status(201).send(result)
            
            // console.log(req.method.yellow, req.url)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
    addUser = async (req, res) => {
        try {
            const result = await service.add(req.body)
            res.status(201).send(result)
            
            console.log(req.method.yellow, req.url)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
    deleteUser = async (req, res) => {
        try {
            const result = await service.del(req.params.id)
            res.status(201).send(result)
            console.log(req.method.red, req.url)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    updateUser = async (req, res) => {
        try {
            const result = await service.update(req.body)
            res.status(201).send(result)
            console.log(req.method.blue, req.url)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }    
    getUser = async (req, res) => {
        try {
            const result = await service.get(req.params.id)
            res.send(result)
            console.log(req.method.green, req.url)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
    getAllUser = async (req, res) => {
        try {
            const result = await service.getAll()
            res.send(result)
            console.log(req.method.green, req.url)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    } 
    getIndex = async (req, res) => {
        try {
            const result = await service.getAll()
            res.sendFile(process.cwd() + "/src/client/index.html");
            // res.send(result)
            console.log(req.method.green, req.url)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
}

module.exports = UserController;