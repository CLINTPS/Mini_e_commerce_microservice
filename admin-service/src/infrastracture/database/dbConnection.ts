import mongoose from "mongoose";

export default async ()=>{
    console.log("Admin database connection checking");
    require("dotenv").config();
    try {
        await mongoose.connect(String(process.env.MONGO_URI_ADMIN))
        console.log("Admin_service database connected..");
    } catch (error:any) {
        console.error("Admin_service database connection failed");
        console.error(error.message);
        process.exit(1)
    }
}