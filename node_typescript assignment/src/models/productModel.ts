export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

// Validation function for the Product interface
export function validateProduct(product: Product): {
  isValid: boolean;
  errors?: string[];
} {
  const errors: string[] = [];

  if (
    !product.name ||
    typeof product.name !== "string" ||
    product.name.trim() === ""
  ) {
    errors.push("Name is required and must be a non-empty string.");
  }

  if (isNaN(product.price) || product.price <= 0) {
    errors.push("Price is required and must be a positive number.");
  }

  if (
    !product.category ||
    typeof product.category !== "string" ||
    product.category.trim() === ""
  ) {
    errors.push("Category is required and must be a non-empty string.");
  }

  const isValid = errors.length === 0;

  return {
    isValid,
    errors: isValid ? undefined : errors,
  };
}