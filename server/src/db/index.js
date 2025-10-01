import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connection = mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      "\n MongoDB connected successfully!! \n DB Host:",
      (await connection).connection.host
    );
  } catch (error) {
    console.error("MongoDB Connection Faild...");
    process.exit(1);
  }
};

export default connectDB;
