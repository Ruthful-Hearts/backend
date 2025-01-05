import mongoose from "mongoose";

export type IStore = {
	name: string;
	description: string;
	logo: string;
	bannerImage: string;
	owner: mongoose.Types.ObjectId;
	businessRegistrationNumber: string;
	isApproved: boolean;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
};

const storeSchema = new mongoose.Schema<IStore>(
	{
		name: { type: String, required: true, trim: true },
		description: { type: String, trim: true },
		logo: { type: String, trim: true },
		bannerImage: { type: String, trim: true },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		businessRegistrationNumber: { type: String, trim: true },
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
