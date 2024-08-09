import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DATABASE CONNECTED");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectdb;
