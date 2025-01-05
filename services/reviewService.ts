import Review from "../models/reviewModel";

export const createReview = async (reviewData) => {
  try {
    if (!reviewData.product && !reviewData.store) {
      throw new Error(
        "A review must be associated with either a product or a store.",
      );
    }
    const review = new Review(reviewData);
    await review.save();
    return review;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getReviewsForProduct = async (productId) => {
  try {
    const reviews = await Review.find({ product: productId }).populate(
      "user",
      "name email",
    );
    return reviews;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getReviewsForStore = async (storeId) => {
  try {
    const reviews = await Review.find({ store: storeId }).populate(
      "user",
      "name email",
    );
    return reviews;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getReviewById = async (reviewId) => {
  try {
    const review = await Review.findById(reviewId).populate(
      "user",
      "name email",
    );
    if (!review) {
      throw new Error("Review not found");
    }
    return review;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateReview = async (reviewId, updateData) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(reviewId, updateData, {
      new: true,
      runValidators: true,
    }).populate("user", "name email");
    if (!updatedReview) {
      throw new Error("Review not found");
    }
    return updatedReview;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      throw new Error("Review not found");
    }
    return deletedReview;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const calculateAverageRating = async (filters) => {
  try {
    const reviews = await Review.find(filters);
    if (reviews.length === 0) {
      return 0;
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  } catch (error) {
    throw new Error(error.message);
  }
};
