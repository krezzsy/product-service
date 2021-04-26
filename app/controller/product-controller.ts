import { MessageUtil } from '../utils/message';
import { ProductService } from '../service/product-service';
import { ProductValidator } from "../utils/product-validator";

export class ProductController {
  productService: ProductService;
  productValidator: ProductValidator;

  constructor (private service: ProductService, private validator: ProductValidator) {
    this.productService = service;
    this.productValidator = validator;
  }

  async find (event: any) {
    console.log('Incoming event: ', event);
    try {
      const result = await this.productService.findProducts();
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  async findOne (event: any) {
    console.log('Incoming event: ', event);

    if(!this.productValidator.validate(event.pathParameters.id)) {
      return MessageUtil.error(400, 'Product is invalid');
    }

    const id: number = Number(event.pathParameters.id);

    try {
      const result = await this.productService.findProductById(id);
      return result ? MessageUtil.success(result) : MessageUtil.error(404, 'Product was not found');
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }
}
