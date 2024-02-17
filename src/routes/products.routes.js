const { Router } = require("express")
const ProductManager = require("../productManager")
const manager = new ProductManager('./src/products.json')

const router = Router()

router.get(`/`, (req, res) => {
    const {limit} = req.query
    const products = manager.getProducts(limit)
    return res.json({
        ok: true,
        products
    })
})

router.get(`/:pid`, (req, res) => {
    const {pid} = req.params
    const product = manager.getProductById(parseInt(pid))
    return res.json({
        ok: true,
        product
    })
})

router.post(`/`, (req, res) => {
    const product = req.body
    manager.addProduct(product)
    return res.json({
        ok: true,
        message: `Se agregó el producto:`,
        product
    })
})

router.put(`/:pid`, (req, res) => {
    const {pid} = req.params
    const updatedProduct = req.body
    manager.updateProduct(parseInt(pid), updatedProduct)
    return res.json({
        ok: true,
        message: `Se actualizó el producto con el ID: ${pid}:`,
        updatedProduct
    })
})

router.delete(`/:pid`, (req, res) => {
    const {pid} = req.params
    manager.deleteProduct(parseInt(pid))
    return res.json({
        ok: true,
        message: `Se elminó el producto con el id: ${pid}`
    })
})

module.exports = router