import { generateManyProducts, generateOneProduct } from "./product.mock";

describe('Tests for product.mock.ts', () => {
  describe('Tests for generateOneProduct', () => {
    it('Should return one product', () => {
      const productMock = generateOneProduct();
      expect(productMock.title).toBeDefined();
    });
  });

  describe('Tests for generateManyProducts', ()=> {
    it('Should return 10 products by default', () => {
      const quantityOfExpectedProducts = 10;
      const products = generateManyProducts();
      expect(products.length).toEqual(quantityOfExpectedProducts);
    });

    it('Should return 20 products by paramater', () => {
      const quantityOfExpectedProducts = 20;
      const products = generateManyProducts(quantityOfExpectedProducts);
      expect(products.length).toEqual(quantityOfExpectedProducts);
    });
  });
});
