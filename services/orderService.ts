import Order from "../models/orderModel";
import Product from "../models/productModel";

export const createOrder = async (orderData) => {
  try {
    const { items } = orderData;
    let totalAmount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new Error(`Product not found: ${item.product}`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product: ${product.name}`);
      }
      totalAmount += item.quantity * product.price;
      product.stock -= item.quantity;
      await product.save();
    }
    const order = new Order({ ...orderData, totalAmount });
    await order.save();
    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getOrderById = async (orderId) => {
  try {
    const order = await Order.findById(orderId)
      .populate("user", "name email")
      .populate("store", "name")
      .populate("items.product", "name price");
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllOrders = async (filters = {}) => {
  try {
    const orders = await Order.find(filters)
      .populate("user", "name email")
      .populate("store", "name")
      .populate("items.product", "name price");
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateOrder = async (orderId, updateData) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("user", "name email")
      .populate("store", "name")
      .populate("items.product", "name price");
    if (!updatedOrder) {
      throw new Error("Order not found");
    }
    return updatedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    if (
      !["pending", "confirmed", "shipped", "delivered", "canceled"].includes(
        status,
      )
    ) {
      throw new Error("Invalid order status");
    }
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    ).populate("user", "name email");
    if (!updatedOrder) {
      throw new Error("Order not found");
    }
    return updatedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getOrdersByUser = async (userId) => {
  try {
    const orders = await Order.find({ user: userId }).populate(
      "items.product",
      "name price",
    );
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getOrdersByStore = async (storeId) => {
  try {
    const orders = await Order.find({ store: storeId }).populate(
      "items.product",
      "name price",
    );
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};
