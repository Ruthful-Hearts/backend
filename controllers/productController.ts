import { Context } from "hono";
import * as productService from "../services/productService";

export const getAllProducts = async (c: Context) => {
  try {
    const products = await productService.getAllProducts();
    return c.json(products);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const getProduct = async (c: Context) => {
  try {
    const productId = c.req.param("id");
    const product = await productService.getProductById(productId);
    return c.json(product);
  } catch (error: any) {
    return c.json({ error: error.message }, 404);
  }
};

export const getStoreProducts = async (c: Context) => {
  try {
    const storeId = c.req.param("storeId");
    const products = await productService.getProductsByStore(storeId);
    return c.json(products);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const createProduct = async (c: Context) => {
  try {
    const productData = await c.req.json();
    const product = await productService.createProduct(productData);
    return c.json({ message: "Product created successfully", product }, 201);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const updateProduct = async (c: Context) => {
  try {
    const productId = c.req.param("id");
    const updateData = await c.req.json();
    const product = await productService.updateProduct(productId, updateData);
    return c.json({ message: "Product updated successfully", product });
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const deleteProduct = async (c: Context) => {
  try {
    const productId = c.req.param("id");
    await productService.deleteProduct(productId);
    return c.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const toggleProductStatus = async (c: Context) => {
  try {
    const productId = c.req.param("id");
    const { isAvailable } = await c.req.json();
    const product = await productService.updateProduct(productId, { isAvailable });
    return c.json({ message: "Product status updated successfully", product });
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};
