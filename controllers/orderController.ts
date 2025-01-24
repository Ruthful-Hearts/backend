import { Context } from "hono";
import * as orderService from "../services/orderService";

export const createOrder = async (c: Context) => {
  try {
    const orderData = await c.req.json();
    orderData.user = c.get("user").id; // Get user from auth middleware
    const order = await orderService.createOrder(orderData);
    return c.json({ message: "Order created successfully", order }, 201);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const getOrder = async (c: Context) => {
  try {
    const orderId = c.req.param("id");
    const order = await orderService.getOrderById(orderId);
    return c.json(order);
  } catch (error: any) {
    return c.json({ error: error.message }, 404);
  }
};

export const updateOrder = async (c: Context) => {
  try {
    const orderId = c.req.param("id");
    const { status } = await c.req.json();
    const order = await orderService.updateOrderStatus(orderId, status);
    return c.json({ message: "Order updated successfully", order });
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const getUserOrders = async (c: Context) => {
  try {
    const userId = c.get("user").id;
    const orders = await orderService.getUserOrders(userId);
    return c.json(orders);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const getStoreOrders = async (c: Context) => {
  try {
    const storeId = c.req.param("storeId");
    const orders = await orderService.getStoreOrders(storeId);
    return c.json(orders);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const completeOrder = async (c: Context) => {
  try {
    const { orderCode } = await c.req.json();
    if (!orderCode) {
      return c.json({ error: "Order code is required" }, 400);
    }

    const result = await orderService.completeOrderByCode(orderCode);
    return c.json(result);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const getOrderByCode = async (c: Context) => {
  try {
    const orderCode = c.req.param("orderCode");
    const userId = c.get("user").id;
    const order = await orderService.getOrderByCode(orderCode, userId);
    return c.json(order);
  } catch (error: any) {
    return c.json({ error: error.message }, 404);
  }
};
