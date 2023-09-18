import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test for product update use case", () => {
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
  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const product = new Product("123", "Product 1", 1);
    await productRepository.create(product);
    const resultFind = await productRepository.find(product.id);

    expect(resultFind).toEqual(product);

    const inputUpdate = {
      id: product.id,
      name: "Product 123 - Updated",
      price: 95
    };

    const outputUpdate = await productUpdateUseCase.execute(inputUpdate);

    expect(outputUpdate).toEqual(inputUpdate);
  });
});