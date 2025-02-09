import mongoose, { Document } from "mongoose";

export interface IOrder extends Document {
	user: mongoose.Types.ObjectId;
	store: mongoose.Types.ObjectId;
	orderCode: string;
	items: Array<{
		product: mongoose.Types.ObjectId;
		quantity: number;
		price: number;
	}>;
	totalAmount: number;
	status: string;
	paymentStatus: string;
	paymentMethod: string;
	createdAt: Date;
	updatedAt: Date;
	paymentDetails: {
		txRef: string;
		paymentDate: Date;
	};
}

const orderSchema = new mongoose.Schema<IOrder>(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		store: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
		orderCode: { 
			type: String, 
			unique: true
		},
		items: [{
			product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
			quantity: { type: Number, required: true, min: 1 },
			price: { type: Number, required: true, min: 0 }
		}],
		totalAmount: { type: Number, required: true, min: 0 },
		status: {
			type: String,
			enum: ["pending", "completed", "cancelled"],
			default: "pending"
		},
		paymentStatus: {
			type: String,
			enum: ["pending", "completed", "failed", "refunded"],
			default: "pending"
		},
		paymentMethod: {
			type: String,
			enum: ["credit_card", "chappa", "bank_transfer"],
			required: true
		},
		paymentDetails: {
			txRef: { type: String },
			paymentDate: { type: Date }
		}
	},
	{ timestamps: true }
);

// Generate unique order code before saving
orderSchema.pre('save', async function(next) {
	const date = new Date();
	const year = date.getFullYear().toString().slice(-2);
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
	this.orderCode = `ORD-${year}${month}${day}-${random}`;
	next();
});

const Order = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
