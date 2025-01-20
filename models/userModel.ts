import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	role: string;
	contactInfo: {
		phone?: string;
		address?: string;
	};
	adminDetails: {
		position: string;
		officeContact: string;
	};
	createdAt: Date;
	updatedAt: Date;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, lowercase: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: ["customer", "store_owner", "admin"],
			default: "customer",
		},
		contactInfo: {
			phone: { type: String, trim: true },
			address: { type: String, trim: true },
		},
		adminDetails: {
			position: { type: String, trim: true },
			officeContact: { type: String, trim: true },
		},
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
	},
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
	return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;
