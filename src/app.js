const express = require("express")
const displayRoutes = require("express-routemap")
const handlebars = require("express-handlebars")
const { mongoDBconnection } = require("./db/mongo.config")

const API_VERSION = "v1"


class App {
    app
    env
    port
    server

    constructor(routes) {
        this.app = express()
        this.env = "development"
        this.port = 8080

        this.connectToDataBase()
        this.initializeMiddlewares()
        this.initializeRoutes(routes)
        this.initHandlebars()
    }

    getServer() {
        return this.app
    }

    closeServer() {
        this.server = this.app.listen(this.port, () => {
            done()
        })
    }

    async connectToDataBase() {
        await mongoDBconnection()
    }

    initializeRoutes(routes) {
        routes.forEach(route => {
            this.app.use(`/api/${API_VERSION}`, route.router)
        });
    }

    initializeMiddlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use("/static", express.static(`${__dirname}/public`))
    }

    initHandlebars() {
        this.app.engine("handlebars", handlebars.engine())
        this.app.set("views", __dirname + "/views")
        this.app.set("view engine", "handlebars")
    }

    listen() {
        this.app.listen(this.port, () => {
            displayRoutes(this.app)
            console.log("^_^^_^_^^_^_^^_^_^^_^")
            console.log(`^_^^_^_^ ENV: ${this.env}`)
            console.log(`^_^^_^_^ PORT: ${this.port}`)
            console.log("^_^^_^_^^_^_^^_^_^^_^")
        })
    }
}

module.exports = App