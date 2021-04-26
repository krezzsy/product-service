export class ProductValidator {

  public validate(id: string): boolean {
    return !isNaN(Number(id));
  }
}
