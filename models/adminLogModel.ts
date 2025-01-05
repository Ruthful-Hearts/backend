import mongoose from "mongoose";

export interface IAdminLog {
	admin: mongoose.Types.ObjectId;
	action:
		| "store_approval"
		| "product_approval"
		| "user_management"
		| "discount_management"
		| "order_management"
		| "other";
	target: string;
	description: string;
	status: "success" | "failure";
	metadata: object;
	createdAt: Date;
}

const adminLogSchema = new mongoose.Schema<IAdminLog>(
	{
		admin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		action: {
			type: String,
			required: true,
			enum: [
				"store_approval",
				"product_approval",
				"user_management",
				"discount_management",
				"order_management",
				"other",
			],
		},
		target: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			trim: true,
		},
		status: {
			type: String,
			enum: ["success", "failure"],
			default: "success",
		},
		metadata: {
			type: Object,
		},
		createdAt: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
	},
);

const AdminLog = mongoose.model<IAdminLog>("AdminLog", adminLogSchema);
export default AdminLog;
