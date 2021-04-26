
import { Handler, Context } from 'aws-lambda';

import { ProductController } from './controller/product-controller';
import { ProductService } from './service/product-service';
import { DbConnector } from './utils/db-connector';
import { ProductValidator } from './utils/product-validator';

const dbConnector = new DbConnector();
const productService = new ProductService(dbConnector);
const productValidator = new ProductValidator();
const productController = new ProductController(productService, productValidator);

export const getProductsList: Handler = (event: any) => productController.find(event);

export const getProductsById: Handler = (event: any, context: Context) => {
  return productController.findOne(event);
};
