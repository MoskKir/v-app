const express = require('express')
const router = require('./routers/export-router')
const mongo = require('mongodb')
const mongoose = require('mongoose')
const colors = require('colors')

require('dotenv').config()

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('State of connection: '.black.bgGreen, 'connected'.green))
    .catch( error => console.error(error))

let stateOfConnection = 'State of connection: '.black.bgGreen
switch (mongoose.connection.readyState) {
    case 0:
        stateOfConnection += ' disconnected'.red
        break;
    case 1:
        stateOfConnection += ' connected'.green
        break;
    case 2:
        stateOfConnection += ' connecting'.blue
        break;
    case 3:
        stateOfConnection += ' disconnecting'.red
        break;
    default:
        break;
} 
console.log(stateOfConnection)

const app = express()

app.use(express.json())
app.use('/api/users', router.userRouter)

app.listen(3000, function () {
    console.log('север дует на http://localhost:3000 '.black.bgGreen)
})