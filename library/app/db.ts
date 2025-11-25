import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// eslint-disable-next-line no-undef
const connectionString: string = process.env.DB_STRING ?? "no connection string";

let isConnected = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(connectionString, {
      autoIndex: true,
    });
    isConnected = true;
    console.log("Connected to MongoDB Database");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

export const getConnection = (): typeof mongoose => mongoose;

export default connectDB;