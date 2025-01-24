import Store from "../models/storeModel";
import { IStore } from "../models/storeModel";

interface CreateStoreData {
  name: string;
  description: string;
  owner: string;
  logo?: string;
  banner?: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
}

export const createStore = async (storeData: CreateStoreData) => {
  try {
    const store = new Store(storeData);
    await store.save();
    return store;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getStoreById = async (storeId: string) => {
  try {
    const store = await Store.findById(storeId).populate("owner", "name email");
    if (!store) {
      throw new Error("Store not found");
    }
    return store;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getStoreByOwner = async (ownerId: string) => {
  try {
    const store = await Store.findOne({ owner: ownerId });
    if (!store) {
      throw new Error("Store not found");
    }
    return store;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllStores = async () => {
  try {
    const stores = await Store.find({ isApproved: true, isActive: true })
      .populate("owner", "name");
    return stores;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateStore = async (storeId: string, updateData: Partial<CreateStoreData>) => {
  try {
    const store = await Store.findByIdAndUpdate(
      storeId,
      updateData,
      { new: true, runValidators: true }
    ).populate("owner", "name email");
    if (!store) {
      throw new Error("Store not found");
    }
    return store;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const approveStore = async (storeId: string) => {
  try {
    const store = await Store.findByIdAndUpdate(
      storeId,
      { isApproved: true },
      { new: true }
    ).populate("owner", "name email");
    if (!store) {
      throw new Error("Store not found");
    }
    return store;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deactivateStore = async (storeId: string) => {
  try {
    const store = await Store.findByIdAndUpdate(
      storeId,
      { isActive: false },
      { new: true }
    );
    if (!store) {
      throw new Error("Store not found");
    }
    return store;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteStore = async (storeId: string) => {
  try {
    const store = await Store.findByIdAndDelete(storeId);
    if (!store) {
      throw new Error("Store not found");
    }
    return store;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
