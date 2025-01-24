import { Context } from "hono";
import * as storeService from "../services/storeService";

export const createStore = async (c: Context) => {
  try {
    const storeData = await c.req.json();
    storeData.owner = c.get("user").id;
    const store = await storeService.createStore(storeData);
    return c.json({ message: "Store created successfully", store }, 201);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const getStore = async (c: Context) => {
  try {
    const storeId = c.req.param("id");
    const store = await storeService.getStoreById(storeId);
    return c.json(store);
  } catch (error: any) {
    return c.json({ error: error.message }, 404);
  }
};

export const getMyStore = async (c: Context) => {
  try {
    const userId = c.get("user").id;
    const store = await storeService.getStoreByOwner(userId);
    return c.json(store);
  } catch (error: any) {
    return c.json({ error: error.message }, 404);
  }
};

export const getAllStores = async (c: Context) => {
  try {
    const stores = await storeService.getAllStores();
    return c.json(stores);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const updateStore = async (c: Context) => {
  try {
    const userId = c.get("user").id;
    const updateData = await c.req.json();
    const store = await storeService.getStoreByOwner(userId);
    const updatedStore = await storeService.updateStore(store.id, updateData);
    return c.json({ message: "Store updated successfully", store: updatedStore });
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const approveStore = async (c: Context) => {
  try {
    const storeId = c.req.param("id");
    const store = await storeService.approveStore(storeId);
    return c.json({ message: "Store approved successfully", store });
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const deactivateStore = async (c: Context) => {
  try {
    const storeId = c.req.param("id");
    const store = await storeService.deactivateStore(storeId);
    return c.json({ message: "Store deactivated successfully", store });
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const deleteStore = async (c: Context) => {
  try {
    const storeId = c.req.param("id");
    await storeService.deleteStore(storeId);
    return c.json({ message: "Store deleted successfully" });
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};
