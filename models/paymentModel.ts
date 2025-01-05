import mongoose from "mongoose";

export interface IPayment {
	order: mongoose.Types.ObjectId;
	user: mongoose.Types.ObjectId;
	paymentMethod: string;
	amount: number;
	transactionId: string;
	status: "pending" | "completed" | "failed";
	currency: string;
	createdAt: Date;
	updatedAt: Date;
}

const paymentSchema = new mongoose.Schema<IPayment>(
	{
		order: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order",
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		paymentMethod: {
			type: String,
			enum: ["stripe", "chappa"],
			required: true,
		},
		amount: {
			type: Number,
			required: true,
			min: 0,
		},
		transactionId: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "completed", "failed"],
			default: "pending",
		},
		currency: {
			type: String,
			default: "USD",
			required: true,
		},
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
	},
);

paymentSchema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

const Payment = mongoose.model<IPayment>("Payment", paymentSchema);
export default Payment;
