const App = require("./app")
const BaseRoute = require("./routes/base.routes")

const app = new App([
    new BaseRoute()
])

app.listen()