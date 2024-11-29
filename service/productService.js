const Product = require('../models/productModel');

const createProduct = async (productData) => {
  try {
    const product = new Product(productData);
    await product.save();
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId).populate('store', 'name');
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllProducts = async (filters = {}) => {
  try {
    const products = await Product.find(filters).populate('store', 'name');
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateProduct = async (productId, updateData) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    }).populate('store', 'name');
    if (!updatedProduct) {
      throw new Error('Product not found');
    }
    return updatedProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

const approveProduct = async (productId) => {
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
  } catch (error) {
    throw new Error(error.message);
  }
};

const deactivateProduct = async (productId) => {
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
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteProduct = async (productId) => {
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProductsByStore = async (storeId) => {
  try {
    const products = await Product.find({ store: storeId }).populate('store', 'name');
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getActiveApprovedProducts = async () => {
  try {
    const products = await Product.find({ isActive: true, isApproved: true }).populate('store', 'name');
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  approveProduct,
  deactivateProduct,
  deleteProduct,
  getProductsByStore,
  getActiveApprovedProducts,
};
