const express = require("express")
const ProductManager = require("../productManager")

const manager = new ProductManager('./src/products.json')
const router = express.Router()

router.get("/realTimeproducts", (req, res) => {
    const products = manager.getProducts(undefined)
    res.render("realTimeProducts", {
        products: products,
    })
})

router.get("/home", (req, res) => {
    const products = manager.getProducts(undefined)
    res.render("home", { mainContent: products })
})


module.exports = router