const Store = require('../models/storeModel');

const createStore = async (storeData) => {
  try {
    const existingStore = await Store.findOne({ owner: storeData.owner });
    if (existingStore) {
      throw new Error('This owner already has a store');
    }
    const store = new Store(storeData);
    await store.save();
    return store;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getStoreById = async (storeId) => {
  try {
    const store = await Store.findById(storeId).populate('owner', 'name email');
    if (!store) {
      throw new Error('Store not found');
    }
    return store;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllStores = async (filters = {}) => {
  try {
    const stores = await Store.find(filters).populate('owner', 'name email');
    return stores;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateStore = async (storeId, updateData) => {
  try {
    const updatedStore = await Store.findByIdAndUpdate(storeId, updateData, {
      new: true,
      runValidators: true,
    }).populate('owner', 'name email');
    if (!updatedStore) {
      throw new Error('Store not found');
    }
    return updatedStore;
  } catch (error) {
    throw new Error(error.message);
  }
};

const approveStore = async (storeId) => {
  try {
    const store = await Store.findByIdAndUpdate(
      storeId,
      { isApproved: true },
      { new: true }
    ).populate('owner', 'name email');
    if (!store) {
      throw new Error('Store not found');
    }
    return store;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deactivateStore = async (storeId) => {
  try {
    const store = await Store.findByIdAndUpdate(
      storeId,
      { isActive: false },
      { new: true }
    );
    if (!store) {
      throw new Error('Store not found');
    }
    return store;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteStore = async (storeId) => {
  try {
    const store = await Store.findByIdAndDelete(storeId);
    if (!store) {
      throw new Error('Store not found');
    }
    return store;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createStore,
  getStoreById,
  getAllStores,
  updateStore,
  approveStore,
  deactivateStore,
  deleteStore,
};
