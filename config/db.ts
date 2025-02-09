import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
	try {
		const mongoUri = process.env.MONGO_URI;
		if (!mongoUri) {
			throw new Error('MONGO_URI is not defined in environment variables');
		}

		await mongoose.connect(mongoUri);
		console.log("✅ MongoDB connected successfully!");
	} catch (error: any) {
		console.error("❌ MongoDB connection error:", error.message);

		setTimeout(() => {
			connectDB();
		}, 5000);
	}
};

export default connectDB;
