import { MessageUtil } from '../utils/message';
import { ProductService } from '../service/product-service';

export class ProductController {
  productService: ProductService;

  constructor (private service: ProductService) {
    this.productService = service;
  }

  async find () {
    try {
      const result = await this.productService.findProducts();
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  async findOne (event: any) {
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
