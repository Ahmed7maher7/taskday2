const productModel = require('../models/product');

exports.getAllProducts = async (req, res) => {
    const products = await productModel.getAllProducts();
    return res.status(200).json(products);
};

exports.getProductById = async (req, res) => {
    const id = req.params.id;
    const product = await productModel.getProductById(id);
    if (!product) return res.status(404).json({message: 'Product not found'});
    return res.status(200).json(product);
};

exports.createProduct = async (req, res) => {
    const {name, price} = req.body;
    const product = await productModel.createProduct({name, price});
    return res.status(201).json(product);
};

exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    const product = await productModel.updateProduct(id, req.body);
    if (!product) return res.status(404).json({message: 'Product not found'});
    return res.status(200).json(product);
};

exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    const product = await productModel.deleteProduct(id);
    if (!product) return res.status(404).json({message: 'Product not found'});
    return res.status(200).json({message: 'Product deleted successfully', product});
};
