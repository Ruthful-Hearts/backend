import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI || "");
const db = client.db();

export const auth = betterAuth({
	database: mongodbAdapter(db),
	emailAndPassword: {
		enabled: true,
	},
});
