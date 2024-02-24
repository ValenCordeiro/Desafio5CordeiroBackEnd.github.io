const App = require("./app")
const BaseRoute = require("./routes/base.routes")
const ProductsRoutes = require("./routes/products.routes")

const app = new App([
    new BaseRoute(), new ProductsRoutes()
])

app.listen()