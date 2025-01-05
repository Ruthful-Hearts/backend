import mongoose from "mongoose";

export interface IDiscount {
	code: string;
	store: mongoose.Types.ObjectId;
	type: "percentage" | "fixed";
	value: number;
	maxDiscount: number;
	minOrderValue: number;
	usageLimit?: number;
	usedCount: number;
	startDate: Date;
	endDate: Date;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const discountSchema = new mongoose.Schema<IDiscount>(
	{
		code: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		store: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Store",
			required: true,
		},
		type: {
			type: String,
			enum: ["percentage", "fixed"],
			required: true,
		},
		value: {
			type: Number,
			required: true,
			min: 0,
		},
		maxDiscount: {
			type: Number,
			min: 0,
		},
		minOrderValue: {
			type: Number,
			default: 0,
		},
		usageLimit: {
			type: Number,
		},
		usedCount: {
			type: Number,
			default: 0,
		},
		startDate: {
			type: Date,
			default: Date.now,
		},
		endDate: {
			type: Date,
			required: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
	},
);

discountSchema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

const Discount = mongoose.model<IDiscount>("Discount", discountSchema);
export default Discount;
