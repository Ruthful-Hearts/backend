import { Context } from "hono";
import * as chappaService from "../services/chappaService";
import * as orderService from "../services/orderService";

export const initializePayment = async (c: Context) => {
  try {
    const { orderId } = await c.req.json();
    const order = await orderService.getOrderById(orderId);
    
    if (!order) {
      return c.json({ error: "Order not found" }, 404);
    }

    const user = c.get("userDocument");
    const txRef = `tx-${Date.now()}-${orderId}`;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      return c.json({ error: "Invalid email format" }, 400);
    }

    const paymentData = {
      amount: order.totalAmount,
      email: user.email.toLowerCase().trim(),
      firstName: user.name.split(' ')[0],
      lastName: user.name.split(' ')[1] || '',
      txRef,
      returnUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
    };

    console.log('Payment Data:', paymentData);

    const response = await chappaService.initializePayment(paymentData);
    
    await orderService.updateOrder(orderId, { 
      paymentStatus: "completed",
      paymentDetails: {
        txRef: txRef
      }
    });

    return c.json({
      checkout_url: response.data.checkout_url,
      txRef
    });
  } catch (error: any) {
    console.error('Payment Error:', error);
    return c.json({ 
      error: error.message,
      details: error.response?.data
    }, 400);
  }
};

export const verifyPayment = async (c: Context) => {
  try {
    const txRef = c.req.param("txRef");
    
    if (!txRef) {
      return c.json({ error: "Transaction reference is required" }, 400);
    }

    const response = await chappaService.verifyPayment(txRef);

    if (response.status === "success" && response.data.status === "success") {
      // Extract orderId from txRef
      const orderId = txRef.split('-')[2];
      
      // Update order payment status
      await orderService.updateOrder(orderId, {
        paymentStatus: "completed"
      });

      return c.json({ 
        message: "Payment successful", 
        transaction: response.data 
      });
    } else {
      return c.json({ 
        error: "Payment failed or pending", 
        transaction: response.data 
      }, 400);
    }
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
};
