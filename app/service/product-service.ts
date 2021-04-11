import { Product } from "../model/product";
import movies from "../data/movies.json";

export class ProductService {

  public async findProducts (): Promise<Product[]> {
    const query = { offset: 0, limit: 20 };
    return Promise.resolve(this.paginated(query));
  }

  public async findProductById (movieId: number): Promise<Product> {
    return Promise.resolve(movies.find(movie => movie.id === movieId));
  }

  private paginated(query: any): Product[] {
    const { offset, limit } = query;
    return movies.slice(offset, offset + limit);
  }
}
