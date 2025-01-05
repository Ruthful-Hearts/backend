import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

reviewSchema.pre("save", function (next) {
  if (!this.product && !this.store) {
    return next(
      new Error(
        "A review must be associated with either a product or a store.",
      ),
    );
  }
  next();
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
