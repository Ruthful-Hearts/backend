import mongoose from "mongoose";

export interface IOrder {
	user: mongoose.Types.ObjectId;
	store: mongoose.Types.ObjectId;
	items: {
		product: mongoose.Types.ObjectId;
		quantity: number;
		price: number;
	}[];
	totalAmount: number;
	status: "pending" | "confirmed" | "shipped" | "delivered" | "canceled";
	payment?: mongoose.Types.ObjectId;
	shippingAddress: {
		addressLine1: string;
		addressLine2?: string;
		city: string;
		state?: string;
		postalCode: string;
		country: string;
	};
	createdAt: Date;
	updatedAt: Date;
}

const orderSchema = new mongoose.Schema<IOrder>(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		store: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Store",
			required: true,
		},
		items: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
					min: 1,
				},
				price: {
					type: Number,
					required: true,
				},
			},
		],
		totalAmount: {
			type: Number,
			required: true,
			min: 0,
		},
		status: {
			type: String,
			enum: ["pending", "confirmed", "shipped", "delivered", "canceled"],
			default: "pending",
		},
		payment: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Payment",
		},
		shippingAddress: {
			addressLine1: { type: String, required: true },
			addressLine2: { type: String },
			city: { type: String, required: true },
			state: { type: String },
			postalCode: { type: String, required: true },
			country: { type: String, required: true },
		},
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
	},
);

orderSchema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

const Order = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
