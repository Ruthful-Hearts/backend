import Payment from '../models/paymentModel';

export const createPayment = async (paymentData) => {
  try {
    const payment = new Payment(paymentData);
    await payment.save();
    return payment;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPaymentById = async (paymentId) => {
  try {
    const payment = await Payment.findById(paymentId).populate('user', 'name email').populate('order');
    if (!payment) {
      throw new Error('Payment not found');
    }
    return payment;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllPayments = async (filters = {}) => {
  try {
    const payments = await Payment.find(filters)
      .populate('user', 'name email')
      .populate('order');
    return payments;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updatePayment = async (paymentId, updateData) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(paymentId, updateData, {
      new: true,
      runValidators: true,
    }).populate('user', 'name email').populate('order');
    if (!updatedPayment) {
      throw new Error('Payment not found');
    }
    return updatedPayment;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPaymentsByUser = async (userId) => {
  try {
    const payments = await Payment.find({ user: userId }).populate('order');
    return payments;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPaymentsByOrder = async (orderId) => {
  try {
    const payments = await Payment.find({ order: orderId }).populate('user', 'name email');
    return payments;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updatePaymentStatus = async (paymentId, status) => {
  try {
    if (!['pending', 'completed', 'failed'].includes(status)) {
      throw new Error('Invalid payment status');
    }

    const updatedPayment = await Payment.findByIdAndUpdate(
      paymentId,
      { status },
      { new: true }
    ).populate('user', 'name email').populate('order');
    if (!updatedPayment) {
      throw new Error('Payment not found');
    }
    return updatedPayment;
  } catch (error) {
    throw new Error(error.message);
  }
};
