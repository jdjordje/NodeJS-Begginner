import { Product } from "../models/product.models.js";

export class ProductService {
    //Get All Products
    static async getAllProducts() {
        const products = await Product.find({});
        console.log(`getAllProducts`)
        return products;
    }
    //Get By Product ID

    static async getProductByID(productId) {

        const foundProduct = await Product.findById(productId);

        if (!foundProduct) throw new Error(`Product not found!`);
        console.log(`get product by id`)
        return foundProduct;
    }

    //Create Product

    static async createProduct(productData) {
        const newProduct = new Product(productData);
        const createdProduct = newProduct.save();
        return createdProduct;
    }

    //Update Product
    static async updateProduct(productId, productData){
        const findProduct = await this.getProductByID(productId);

        Object.assign(findProduct, productData);

        const updatedProduct = findProduct.save();

        return updatedProduct;
    }

    //Delete Product

    static async deleteProduct(productId){
        const findAndDelete = await Product.findByIdAndDelete(productId);
        if(!findAndDelete) throw new Error (`Product not found!`)
        
    }
}