const mongoose = require("mongoose")

const DB_HOST = "127.0.0.1"
const DB_NAME = "mongoProductDB"
const DB_PORT = 27017

const configConnection = {
    url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
}

const mongoDBconnection = async() => {
    try{
        await mongoose.connect(configConnection.url, configConnection.options)
    }
    catch (error) {
        console.log(error)

        throw new Error(error)
    }
}

module.exports = {
    configConnection,
    mongoDBconnection
}