const fs = require('fs')

class ProductManager {
    constructor(filePath) {
        this.path = filePath
        this.products = []
        this.loadProducts()
        this.productIdCounter = this.calculateNextProductId()
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8')
            this.products = JSON.parse(data)
            if (!Array.isArray(this.products)) {
                this.products = []
            }
        } catch (error) {
            console.log(error)
            this.products = []
        }
    }

    calculateNextProductId() {
        const ids = this.products.map(prod => prod.id)
        const maxId = Math.max(...ids)
        return maxId + 1
    }

    saveProducts() {
        try {
            const data = JSON.stringify(this.products, null, 2)
            fs.writeFileSync(this.path, data)
        } catch (error) {
            console.error('Error al guardar productos:', error)
        }
    }

    addProduct(product) {
        const { title, description, price, thumbnail, code, stock, category } = product

        if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
            console.error("Todos los campos son obligatorios")
            return
        }

        const codeExists = this.products.some((existingProduct) => existingProduct.code === code)
        if (codeExists) {
            console.error("El código del producto ya existe")
            return
        }

        const newProduct = {
            id: this.productIdCounter++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status : true,
            category
        }

        this.products.push(newProduct)
        this.saveProducts()
    }

    getProducts(limit) {
        let filteredProducts = []
        if (limit === undefined || limit >= this.products.length) {
            return this.products
        } else {
            for (let i = 0; i < limit; i++) {
                filteredProducts.push(this.products[i])
            }
            return filteredProducts
        }
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id)
        if (!product) {
            return "¡¡ERROR!! Producto no encontrado"
        }
        return product
    }

    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex((p) => p.id === id)
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedProduct, id }
            this.saveProducts()
        } else {
            console.error("Producto no encontrado")
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex((p) => p.id === id)
        if (index !== -1) {
            this.products.splice(index, 1)
            this.saveProducts()
        } else {
            console.error("Producto no encontrado")
        }
    }
}

module.exports = ProductManager