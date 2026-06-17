
import mongoose, { connect } from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};