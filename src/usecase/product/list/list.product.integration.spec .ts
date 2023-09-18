import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create(
    "a",
    "Product A",
    23);

  const product2 = ProductFactory.create(
    "b",
    "Product B",
    77);
  
  const MockRepository = () => {
    return {
      create: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    };
  };

describe("test Listing product use case", () => {

    it("should list a product", async () => {
      const productRepository = new ProductRepository();
      const usecase = new ListProductUseCase(productRepository);
  
      const product1 = new Product("123", "Product 123", 175);
      const product2 = new Product("123", "Product 123", 175);
  
      await productRepository.create(product1);
      await productRepository.create(product2);
  
      const input1 = {
        id: "123",
      };

      const input2 = {
        id: "123",
      };
  
      const output1 = {
        id: "123",
        name: "Product 123",
        price: 175
      };

      const output2 = {
        id: "123",
        name: "Product 123",
        price: 175
      };
  
      const result1 = await productRepository.find(input1.id);
      const result2 = await productRepository.find(input2.id);
  
      expect(result1).toEqual(output1);
      expect(result2).toEqual(output2);

      const output = await usecase.execute({});
  
      expect(output.products.length).toBe(2);
      expect(output.products[0].id).toBe(product1.id);
      expect(output.products[0].name).toBe(product1.name);
      expect(output.products[0].price).toBe(product1.price);
      expect(output.products[1].id).toBe(product2.id);
      expect(output.products[1].name).toBe(product2.name);
      expect(output.products[1].price).toBe(product2.price);      
      });
})