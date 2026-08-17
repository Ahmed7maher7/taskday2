const fs = require('fs').promises;
const path = require('path');

module.exports = class Product {
    static async getAllProducts() {
        const dataBuffer = await fs.readFile(
            path.resolve(__dirname, '..', 'data', 'data.json')
        );
        const { products } = JSON.parse(dataBuffer);
        return products;
    }

    static async getProductById(id) {
        const products = await this.getAllProducts();
        const product = products.find(product => product.id === Number(id));
        return product;
    }

    static async createProduct(product) {
        const dataBuffer = await fs.readFile(
            path.resolve(__dirname, '..', 'data', 'data.json')
        );
        const data = JSON.parse(dataBuffer);
        const nextId = data.products.length ? data.products[data.products.length - 1].id + 1 : 1;
        product.id = nextId;
        data.products.push(product);
        await fs.writeFile(
            path.resolve(__dirname, '..', 'data', 'data.json'),
            JSON.stringify(data, null, 2)
        );
        return product;
    }

    static async updateProduct(id, updatedProduct) {
        const dataBuffer = await fs.readFile(
            path.resolve(__dirname, '..', 'data', 'data.json')
        );
        const data = JSON.parse(dataBuffer);
        const product = data.products.find(product => product.id === Number(id));
        if (!product) return null;
        product.name = updatedProduct.name || product.name;
        product.price = updatedProduct.price || product.price;
        await fs.writeFile(
            path.resolve(__dirname, '..', 'data', 'data.json'),
            JSON.stringify(data, null, 2)
        );
        return product;
    }

    static async deleteProduct(id) {
        const dataBuffer = await fs.readFile(
            path.resolve(__dirname, '..', 'data', 'data.json')
        );
        const data = JSON.parse(dataBuffer);
        const index = data.products.findIndex(product => product.id === Number(id));
        if (index === -1) return null;
        const product = data.products.splice(index, 1)[0];
        await fs.writeFile(
            path.resolve(__dirname, '..', 'data', 'data.json'),
            JSON.stringify(data, null, 2)
        );
        return product;
    }
};
