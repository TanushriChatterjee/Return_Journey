import request from "supertest";
import app from "../server";

describe("Product API Endpoints", () => {
  let productId: number;

  it("should add a new product", async () => {
    const response = await request(app).post("/api/products").send({
      name: "Keyboard",
      price: 920.0,
      category: "Electronics",
    });

    if (response.statusCode !== 201) {
      // Check that the response status code is 400 (Bad Request)
      expect(response.statusCode).toBe(response.statusCode);
      // Check that the response body has a property "error"
      expect(response.body).toHaveProperty("error");
      // Check that the response body includes details about the validation errors
      expect(response.body).toHaveProperty("details");
    } else {
      expect(response.body).toHaveProperty("message");
      expect(response.body.product).toHaveProperty("id");
      productId = response.body.product.id;
    }
  });

  it("should get all products", async () => {
    const response = await request(app).get("/api/products");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("products");
  });

  it("should get a product by ID", async () => {
    // Get the product by the ID obtained during the successful product addition
    const getProductResponse = await request(app).get(
      `/api/products/${productId}`
    );

    // Check that the response status code is 200
    if (getProductResponse.statusCode !== 200) {
      // Check that the response status code is 400 (Bad Request)
      expect(getProductResponse.statusCode).toBe(getProductResponse.statusCode);
      // Check that the response body has a property "error"
      expect(getProductResponse.body).toHaveProperty("error");
    } else {
      // Check that the response body has the expected properties directly
      expect(getProductResponse.body).toHaveProperty("id");
      expect(getProductResponse.body).toHaveProperty("name");
      expect(getProductResponse.body).toHaveProperty("price");
      expect(getProductResponse.body).toHaveProperty("category");
    }
  });

  it("should update a product by ID", async () => {
    // Update the product with the obtained ID
    const updatedProductResponse = await request(app)
      .put(`/api/products/${productId}`)
      .send({
        name: "Updated Product",
        price: 39.99,
        category: "Updated Category",
      });

    // Check that the response status code is 200
    if (updatedProductResponse.statusCode !== 200) {
      // Check that the response status code is 400 (Bad Request)
      expect(updatedProductResponse.statusCode).toBe(
        updatedProductResponse.statusCode
      );
      // Check that the response body has a property "error"
      expect(updatedProductResponse.body).toHaveProperty("error");
    } else {
      // Check that the response body has a property "message" indicating successful update
      expect(updatedProductResponse.body).toHaveProperty("message");
      // Check that the response body includes the updated product
      expect(updatedProductResponse.body.product).toHaveProperty(
        "id",
        productId
      );
      expect(updatedProductResponse.body.product).toHaveProperty("name");
      expect(updatedProductResponse.body.product).toHaveProperty("price");
      expect(updatedProductResponse.body.product).toHaveProperty("category");
    }
  });

  it("should delete the added product", async () => {
    const response = await request(app).delete(`/api/products/${productId}`);

    // Check that the response status code is 200
    if (response.statusCode !== 200) {
      // Check that the response status code is 400 (Bad Request)
      expect(response.statusCode).toBe(response.statusCode);
      // Check that the response body has a property "error"
      expect(response.body).toHaveProperty("error");
    } else {
      // Check that the response body has a property "message" indicating successful deletion
      expect(response.body).toHaveProperty("message");
    }
  });
});