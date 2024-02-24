const { Router } = require("express")
const CartManager = require("../cartManager")

class CartsRoutes {

    path = "/carts"

    manager = new CartManager('./src/carts.json')

    router = Router()

    constructor() {
        this.initCartsRoutes()
    }


    initCartsRoutes() {

    this.router.post(`${this.path}`, (req, res) => {
        const { products } = req.body
        newCart = manager.createCart(products)
        return res.json({
            ok: true,
            message: "Carrito creado:",
            newCart
        })
    }),

    this.router.get(`${this.path}:cid`, (req, res) => {
        const { cid } = req.params
        products = manager.getProductsInCart(parseInt(cid))
        return res.json({
            ok: true,
            message: `Los productos del carrito con el ID ${cid} son:`,
            products
        })
    }),

    this.router.post(`${this.path}:cid/product/:pid`, (req, res) => {
        const { cid, pid } = req.params
        cart = manager.addProductToCart(parseInt(cid), parseInt(pid), 1)
        return res.json({
            ok: true,
            message: `Carrito actualizado, este es el nuevo carrito con el ID ${cid}:`,
            cart
        })
    })
}



}


module.exports = router