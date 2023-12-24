import { Request, Response } from "express";
import fs from "fs";
import { Product, validateProduct } from "../models/productModel";

const productsFilePath = "./products.json";

//get all products
export const getAllProducts = (req: Request, res: Response): void => {
  try {
    fs.readFile(productsFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      const products: Product[] = JSON.parse(data);
      res.json(products);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

//get a product by ID
export const getProductById = (req: Request, res: Response): void => {
  try {
    const productId: number = parseInt(req.params.id, 10);

    if (isNaN(productId)) {
      res.status(400).json({ error: "Invalid product ID" });
      return;
    }

    fs.readFile(productsFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      try {
        const parsedData = JSON.parse(data);

        if (
          !parsedData ||
          !parsedData?.products ||
          !Array.isArray(parsedData?.products)
        ) {
          console.error(
            "Error: Invalid or missing products array in the JSON data"
          );
          res.status(500).send("Internal Server Error");
          return;
        }

        const products: Product[] = parsedData?.products;
        const product: Product | undefined = products?.find(
          (p) => p.id === productId
        );

        if (!product) {
          res.status(404).json({ error: "Product not found" });
          return;
        }

        res.json(product);
      } catch (parseError) {
        console.error("Error parsing products data:", parseError);
        res.status(500).send("Internal Server Error");
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

//add a product
export const addProduct = (req: Request, res: Response): void => {
  try {
    const newProduct: Product = req.body;

    // Validate the new product
    const validationResult = validateProduct(newProduct);

    if (!validationResult.isValid) {
      res
        .status(400)
        .json({ error: "Validation failed", details: validationResult.errors });
      return;
    }

    // Read the existing products from the file
    fs.readFile(productsFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      try {
        const parsedData = JSON.parse(data);

        if (
          !parsedData ||
          !parsedData?.products ||
          !Array.isArray(parsedData?.products)
        ) {
          console.error(
            "Error: Invalid or missing products array in the JSON data"
          );
          res.status(500).send("Internal Server Error");
          return;
        }

        const products: Product[] = parsedData?.products;

        // Determine the next available ID
        const nextId =
          products?.length > 0 ? Math.max(...products?.map((p) => p.id)) + 1 : 1;

        // Create the new product with the auto-incremented ID
        const productWithId: Product = {
          ...newProduct,
          id: nextId,
        };

        // Add the new product to the array
        products?.push(productWithId);

        // Update the original structure with the "products" key
        parsedData.products = products;

        // Write the updated products array back to the file
        fs.writeFile(
          productsFilePath,
          JSON.stringify(parsedData, null, 2),
          "utf8",
          (err) => {
            if (err) {
              console.error("Error writing file:", err);
              res.status(500).send("Internal Server Error");
              return;
            }

            res.status(201).json({
              message: "Product added successfully",
              product: productWithId,
            });
          }
        );
      } catch (parseError) {
        console.error("Error parsing products data:", parseError);
        res.status(500).send("Internal Server Error");
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

//update the product by ID
export const updateProductById = (req: Request, res: Response): void => {
  try {
    const productId: number = parseInt(req.params.id, 10);

    if (isNaN(productId)) {
      res.status(400).json({ error: "Invalid product ID" });
      return;
    }

    const updatedProduct: Product = req.body;

    // Validate the updated product
    const validationResult = validateProduct(updatedProduct);

    if (!validationResult.isValid) {
      res
        .status(400)
        .json({ error: "Validation failed", details: validationResult.errors });
      return;
    }

    // Read the existing products from the file
    fs.readFile(productsFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      try {
        const parsedData = JSON.parse(data);

        if (
          !parsedData ||
          !parsedData?.products ||
          !Array.isArray(parsedData?.products)
        ) {
          console.error(
            "Error: Invalid or missing products array in the JSON data"
          );
          res.status(500).send("Internal Server Error");
          return;
        }

        const products: Product[] = parsedData?.products;

        // Find the index of the product with the specified ID
        const index = products?.findIndex((p) => p.id === productId);

        if (index === -1) {
          res.status(404).json({ error: "Product not found" });
          return;
        }

        // Update the product at the found index
        products[index] = {
          ...products[index],
          ...updatedProduct,
          id: productId, // Ensure the ID remains the same
        };

        // Update the original structure with the "products" key
        parsedData.products = products;

        // Write the updated products array back to the file
        fs.writeFile(
          productsFilePath,
          JSON.stringify(parsedData, null, 2),
          "utf8",
          (err) => {
            if (err) {
              console.error("Error writing file:", err);
              res.status(500).send("Internal Server Error");
              return;
            }

            res.json({
              message: "Product updated successfully",
              product: products[index],
            });
          }
        );
      } catch (parseError) {
        console.error("Error parsing products data:", parseError);
        res.status(500).send("Internal Server Error");
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

//delete the product by ID
export const deleteProductById = (req: Request, res: Response): void => {
  try {
    const productId: number = parseInt(req.params.id, 10);

    if (isNaN(productId)) {
      res.status(400).json({ error: "Invalid product ID" });
      return;
    }

    // Read the existing products from the file
    fs.readFile(productsFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      try {
        const parsedData = JSON.parse(data);

        if (
          !parsedData ||
          !parsedData?.products ||
          !Array.isArray(parsedData?.products)
        ) {
          console.error(
            "Error: Invalid or missing products array in the JSON data"
          );
          res.status(500).send("Internal Server Error");
          return;
        }

        const products: Product[] = parsedData?.products;

        // Find the index of the product with the specified ID
        const index = products?.findIndex((p) => p.id === productId);

        if (index === -1) {
          res.status(404).json({ error: "Product not found" });
          return;
        }

        // Remove the product at the found index
        const removedProduct = products?.splice(index, 1)[0];

        // Update the original structure with the "products" key
        parsedData.products = products;

        // Write the updated products array back to the file
        fs.writeFile(
          productsFilePath,
          JSON.stringify(parsedData, null, 2),
          "utf8",
          (err) => {
            if (err) {
              console.error("Error writing file:", err);
              res.status(500).send("Internal Server Error");
              return;
            }

            res.json({
              message: "Product deleted successfully",
              product: removedProduct,
            });
          }
        );
      } catch (parseError) {
        console.error("Error parsing products data:", parseError);
        res.status(500).send("Internal Server Error");
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};