import mongoose from "mongoose";

export interface IProduct {
	name: string;
	description?: string;
	price: number;
	stock: number;
	images: string[];
	is3DViewEnabled: boolean;
	variations: {
		colors: string[];
		sizes: string[];
	};
	store: mongoose.Types.ObjectId;
	category: string;
	isApproved: boolean;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>(
	{
		name: { type: String, required: true, trim: true },
		description: { type: String, trim: true },
		price: { type: Number, required: true, min: 0 },
		stock: { type: Number, default: 0, min: 0 },
		images: [{ type: String }],
		is3DViewEnabled: { type: Boolean, default: false },
		variations: {
			colors: [{ type: String }],
			sizes: [{ type: String }],
		},
		store: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Store",
			required: true,
		},
		category: {
			type: String,
			trim: true,
			required: true,
		},
		isApproved: { type: Boolean, default: false },
		isActive: { type: Boolean, default: true },
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
