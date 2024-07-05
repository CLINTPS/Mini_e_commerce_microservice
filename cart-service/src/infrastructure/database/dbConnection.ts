import mongoose from "mongoose";

export default async () => {
  require("dotenv").config();
  try {
    await mongoose.connect(String(process.env.MONGO_URL).trim());
    console.log("Cart Database connection successfully..");
    
  } catch (error: any) {
    console.error(`Cart Database Connection failed`);
    console.error(error.message);
    process.exit(1);
  }
};
