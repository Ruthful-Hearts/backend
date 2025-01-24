import Product from '../models/productModel';
import { IProduct } from '../models/productModel';

interface CreateProductData {
  name: string;
  store: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  isAvailable?: boolean;
}

export const createProduct = async (productData: CreateProductData) => {
  try {
    const product = new Product(productData);
    await product.save();
    return product;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getProductById = async (productId: string) => {
  try {
    const product = await Product.findById(productId).populate('store', 'name');
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllProducts = async (filters: Record<string, any> = {}) => {
  try {
    const products = await Product.find(filters).populate('store', 'name');
    return products;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateProduct = async (productId: string, updateData: Partial<CreateProductData>) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    ).populate('store', 'name');
    if (!updatedProduct) {
      throw new Error('Product not found');
    }
    return updatedProduct;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const approveProduct = async (productId: string) => {
  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      { isApproved: true },
      { new: true }
    ).populate('store', 'name');
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deactivateProduct = async (productId: string) => {
  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      { isActive: false },
      { new: true }
    );
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getProductsByStore = async (storeId: string) => {
  try {
    const products = await Product.find({ store: storeId }).populate('store', 'name');
    return products;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getActiveApprovedProducts = async () => {
  try {
    const products = await Product.find({ isActive: true, isApproved: true }).populate('store', 'name');
    return products;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
