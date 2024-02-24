const { Router } = require("express")
const ProductManager = require("../productManager")

class ProductsRoutes {

    path = "/products"

    manager = new ProductManager('./src/products.json')

    router = Router()

    constructor() {
        this.initProductsRoutes()
    }

    initProductsRoutes() {
        this.router.get(`${this.path}`, (req, res) => {
            const { limit } = req.query
            const products = manager.getProducts(limit)
            return res.json({
                ok: true,
                products
            }),

                this.router.get(`${this.path}:pid`, (req, res) => {
                    const { pid } = req.params
                    const product = manager.getProductById(parseInt(pid))
                    return res.json({
                        ok: true,
                        product
                    })
                }),

                this.router.post(`${this.path}`, (req, res) => {
                    const product = req.body
                    manager.addProduct(product)
                    return res.json({
                        ok: true,
                        message: `Se agregó el producto:`,
                        product
                    })
                }),

                this.router.put(`${this.path}:pid`, (req, res) => {
                    const { pid } = req.params
                    const updatedProduct = req.body
                    manager.updateProduct(parseInt(pid), updatedProduct)
                    return res.json({
                        ok: true,
                        message: `Se actualizó el producto con el ID: ${pid}:`,
                        updatedProduct
                    })
                }),

                this.router.delete(`${this.path}:pid`, (req, res) => {
                    const { pid } = req.params
                    manager.deleteProduct(parseInt(pid))
                    return res.json({
                        ok: true,
                        message: `Se elminó el producto con el id: ${pid}`
                    })
                })

        })
    }

}

module.exports = ProductsRoutes