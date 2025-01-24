import mongoose, { Document } from "mongoose";

export interface IStore extends Document {
	name: string;
	description: string;
	logo?: string;
	banner?: string;
	owner: mongoose.Types.ObjectId;
	contactInfo: {
		email: string;
		phone: string;
		address: string;
	};
	isApproved: boolean;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const storeSchema = new mongoose.Schema<IStore>(
	{
		name: { type: String, required: true, trim: true },
		description: { type: String, required: true },
		logo: { type: String },
		banner: { type: String },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		contactInfo: {
			email: { type: String, required: true },
			phone: { type: String, required: true },
			address: { type: String, required: true }
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

storeSchema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

const Store = mongoose.model<IStore>("Store", storeSchema);
export default Store;
