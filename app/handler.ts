
import { Handler, Context } from 'aws-lambda';

import { ProductController } from './controller/product-controller';
import { ProductService } from './service/product-service';

const productService = new ProductService();
const productController = new ProductController(productService);

export const getProductsList: Handler = () => productController.find();

export const getProductsById: Handler = (event: any, context: Context) => {
  return productController.findOne(event);
};
