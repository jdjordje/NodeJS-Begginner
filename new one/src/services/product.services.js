import { Product } from "../models/product.models.js";

export class ProductService {
  //Get All Products
  static async getAllProducts(filter) {
   
    const {stock,descriptionFilter,titleFilter,categoryFilter} = filter;

    if(descriptionFilter){
      const products = await Product.find(
        {$text:
          {$search: descriptionFilter}
        }
      );
      return products;
    }
    
    if(titleFilter){
      const products = await Product.find({title:{$in: titleFilter }});
      
      return products;
    }

    if(categoryFilter){
      const products = await Product.find({category:{$in: categoryFilter }});
      
      return products;
    }

    if(stock >= 1){
        const products = await Product.find({stock:{$gte: Number(stock)}});
        
        return products;

    }
    if(stock < 1){
        const products = await Product.find({stock:{$eq: Number(stock)}});
        
        return products;
    }
    const products = await Product.find({});
    console.log(`getAllProducts`);



    return products;
  }
  //Get By Product ID

  static async getProductByID(productId) {
    const foundProduct = await Product.findById(productId);

    if (!foundProduct) throw new Error(`Product not found!`);
    console.log(`get product by id`);
    return foundProduct;
  }

  //Create Product

  static async createProduct(productData) {
    const newProduct = new Product(productData);
    const createdProduct = newProduct.save();
    return createdProduct;
  }

  //Update Product
  static async updateProduct(productId, productData) {
    const findProduct = await this.getProductByID(productId);

    Object.assign(findProduct, productData);

    const updatedProduct = findProduct.save();

    return updatedProduct;
  }

  //Delete Product

  static async deleteProduct(productId) {
    const findAndDelete = await Product.findByIdAndDelete(productId);
    if (!findAndDelete) throw new Error(`Product not found!`);
  }
}
