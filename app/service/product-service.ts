import { DbConnector } from '../utils/db-connector';
import { ProductEntity } from '../model/entities/product.entity';
import { ProductDto } from '../model/dto/product.dto';

export class ProductService {
  private dbConnector;

  constructor(dbConnector: DbConnector) {
    this.dbConnector = dbConnector;
  }

  public async findProducts (): Promise<ProductEntity[]> {
    const conn = await this.dbConnector.getConnection();
    return await conn.getRepository(ProductEntity).find();
  }

  public async findProductById (movieId: number): Promise<ProductDto> {
    const conn = await this.dbConnector.getConnection();
    return await conn.query('SELECT id, title, tagline, price, budget, revenue, description, vote_average, poster_path, genres, runtime, stocks.count FROM products INNER JOIN stocks ON stocks.product_id = products.id WHERE products.id = $1', [
      movieId,
    ]);
  }
}
