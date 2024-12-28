const Discount = require('../models/discountModel');

const createDiscount = async (discountData) => {
  try {
    const existingDiscount = await Discount.findOne({ code: discountData.code });
    if (existingDiscount) {
      throw new Error('Discount code already exists');
    }

    const discount = new Discount(discountData);
    await discount.save();
    return discount;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDiscountById = async (discountId) => {
  try {
    const discount = await Discount.findById(discountId).populate('store', 'name');
    if (!discount) {
      throw new Error('Discount not found');
    }
    return discount;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllDiscounts = async (filters = {}) => {
  try {
    const discounts = await Discount.find(filters).populate('store', 'name');
    return discounts;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateDiscount = async (discountId, updateData) => {
  try {
    const updatedDiscount = await Discount.findByIdAndUpdate(discountId, updateData, {
      new: true,
      runValidators: true,
    }).populate('store', 'name');
    if (!updatedDiscount) {
      throw new Error('Discount not found');
    }
    return updatedDiscount;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deactivateDiscount = async (discountId) => {
  try {
    const discount = await Discount.findByIdAndUpdate(
      discountId,
      { isActive: false },
      { new: true }
    );
    if (!discount) {
      throw new Error('Discount not found');
    }
    return discount;
  } catch (error) {
    throw new Error(error.message);
  }
};

const applyDiscount = async (code, orderValue) => {
  try {
    const discount = await Discount.findOne({ code, isActive: true });
    if (!discount) {
      throw new Error('Discount code not found or inactive');
    }

    const now = new Date();
    if (now < discount.startDate || now > discount.endDate) {
      throw new Error('Discount is not valid at this time');
    }

    if (orderValue < discount.minOrderValue) {
      throw new Error(`Order value must be at least ${discount.minOrderValue}`);
    }

    if (discount.usageLimit && discount.usedCount >= discount.usageLimit) {
      throw new Error('Discount usage limit reached');
    }

    let discountAmount =
      discount.type === 'percentage'
        ? (orderValue * discount.value) / 100
        : discount.value;

    if (discount.type === 'percentage' && discount.maxDiscount) {
      discountAmount = Math.min(discountAmount, discount.maxDiscount);
    }

    discount.usedCount += 1;
    await discount.save();

    return {
      discountAmount,
      newTotal: orderValue - discountAmount,
      discount,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteDiscount = async (discountId) => {
  try {
    const discount = await Discount.findByIdAndDelete(discountId);
    if (!discount) {
      throw new Error('Discount not found');
    }
    return discount;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createDiscount,
  getDiscountById,
  getAllDiscounts,
  updateDiscount,
  deactivateDiscount,
  applyDiscount,
  deleteDiscount,
};
