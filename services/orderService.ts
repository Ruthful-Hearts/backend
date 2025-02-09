import Order from "../models/orderModel";
import Product from "../models/productModel";

interface CreateOrderData {
  user: string;
  store: string;
  items: Array<{
    product: string;
    quantity: number;
  }>;
  paymentMethod: string;
}

export const createOrder = async (orderData: CreateOrderData) => {
  try {
    // Calculate prices and total amount
    const orderItems = await Promise.all(
      orderData.items.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Product ${item.product} not found`);
        }
        return {
          product: item.product,
          quantity: item.quantity,
          price: product.price
        };
      })
    );

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new Order({
      ...orderData,
      items: orderItems,
      totalAmount
    });

    await order.save();
    
    // Return order with orderCode
    return {
      ...order.toObject(),
      message: `Your order has been created successfully. Your order code is: ${order.orderCode}`
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const order = await Order.findById(orderId)
      .populate("user", "name email")
      .populate("store", "name")
      .populate("items.product", "name price");
    
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  } catch (error: any) {
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
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateOrder = async (orderId: string, updateData: {
  status?: string;
  paymentStatus?: string;
  paymentMethod?: string;
  paymentDetails?: {
    txRef?: string;
    paymentDate?: Date;
  };
}) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true,
      runValidators: true,
    }).populate("user", "name email")
      .populate("store", "name")
      .populate("items.product", "name price");
    if (!updatedOrder) {
      throw new Error("Order not found");
    }
    return updatedOrder;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserOrders = async (userId: string) => {
  try {
    const orders = await Order.find({ user: userId })
      .populate("store", "name")
      .populate("items.product", "name price")
      .sort({ createdAt: -1 });
    return orders;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getStoreOrders = async (storeId: string) => {
  try {
    const orders = await Order.find({ store: storeId })
      .populate("user", "name email")
      .populate("items.product", "name price")
      .sort({ createdAt: -1 });
    return orders;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Add a new method to find order by code
export const getOrderByCode = async (orderCode: string, userId: string) => {
  try {
    const order = await Order.findOne({ orderCode })
      .populate("store", "name")
      .populate("items.product", "name price");
    
    if (!order) {
      throw new Error("Order not found");
    }

    // Only allow the order owner to see their order code
    if (order.user.toString() !== userId) {
      throw new Error("Unauthorized access to order");
    }

    return order;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const completeOrderByCode = async (orderCode: string) => {
  try {
    const order = await Order.findOne({ orderCode });
    if (!order) {
      throw new Error("Order not found");
    }

    // Update order status and remove orderCode
    const updatedOrder = await Order.findByIdAndUpdate(
      order._id,
      { 
        status: "completed",
        orderCode: null  // Remove the order code
      },
      { new: true }
    ).populate("items.product", "name price");

    if (!updatedOrder) {
      throw new Error("Failed to complete order");
    }

    return {
      message: "Order completed successfully",
      order: updatedOrder
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
