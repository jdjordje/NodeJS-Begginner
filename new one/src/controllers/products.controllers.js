import { ProductService } from "../services/product.services.js";
import { productValidation, updateProductValidation } from "../schemas/products.schema.js";


export class ProductController {
  static async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();

      return res.json(products);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  static async getProductByID(req, res) {
    try {
      const foundProduct = await ProductService.getProductByID(req.params.id);

      return res.json(foundProduct);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: error.message });
    }
  }

  static async createProducts(req, res) {
    try {
      await productValidation.validateAsync(req.body, {
        abortEarly: false,
      });
      const newProduct = await ProductService.createProduct(req.body);
      console.log(newProduct);
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      await updateProductValidation.validateAsync(req.body);

      const updateProduct = await ProductService.updateProduct(req.params.id, req.body);

      return res.json(updateProduct);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }

  static async deleteProduct(req,res){
    try {
      await ProductService.deleteProduct(req.params.id);

      return res.status(204)
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }
}
