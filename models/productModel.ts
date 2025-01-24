import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
	name: string;
	store: mongoose.Types.ObjectId;
	description: string;
	price: number;
	images: string[];
	category: string;
	stock: number;
	isAvailable: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>(
	{
		name: { type: String, required: true, trim: true },
		store: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Store",
			required: true,
		},
		description: { type: String, required: true },
		price: { type: Number, required: true, min: 0 },
		images: [{ type: String }],
		category: { type: String, required: true },
		stock: { type: Number, required: true, min: 0 },
		isAvailable: { type: Boolean, default: true },
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
	},
);

productSchema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
