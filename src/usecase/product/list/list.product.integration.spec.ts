import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

// const product1 = ProductFactory.create(
//     "a",
//     "Product A",
//     23);

//   const product2 = ProductFactory.create(
//     "b",
//     "Product B",
//     77);
  
describe("test Listing product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });  

    it("should list a product", async () => {
      const productRepository = new ProductRepository();
      const usecase = new ListProductUseCase(productRepository);
  
      const product1 = new Product("123", "Product 1", 175);
      const product2 = new Product("456", "Product 2", 175);
  
      await productRepository.create(product1);
      await productRepository.create(product2);
  
      const output1 = {
        id: "123",
        name: "Product 1",
        price: 175
      };

      const output2 = {
        id: "456",
        name: "Product 2",
        price: 175
      };
  
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