const Product = require("../models/Product")

//Obtener todos los productos con paginacion
const getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 9, orderBy = "name", orderDirection = "ASC" } = req.query
        const offset = (page - 1) * limit

        const products = await Product.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [[orderBy, orderDirection.toUpperCase()]]
        })

        res.json({
            total: products.count,
            totalPages: Math.ceil(products.count / limit),
            currentPage: parseInt(page),
            products: products.rows,
        })
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" })
    }
}

//Obtener un solo producto por ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id)
        if (!product) return res.status(404).json({ error: "Producto no encontrado" })
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el producto" })
    }
}

//Crear un nuevo producto
const createProduct = async (req, res) => {
    try {
        const {name, description, price, stock, imageUrl} = req.body
        const newProduct = await Product.create({name, description, price, stock, imageUrl})
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(500).json({ error: "Error al crear el producto" })        
    }
}

//Modificar un producto existente
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id)
        if (!product) return res.status(404).json({ error: "Producto no encontrado" })
        await product.update(req.body)
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el producto" })        
    }
}

//Eliminar un producto existente
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id)
        if(!product) return res.status(404).json({ error: "Producto no encontrado" })
        await product.destroy()
        res.json({ message: "Producto eliminado" })
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el producto" })
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}