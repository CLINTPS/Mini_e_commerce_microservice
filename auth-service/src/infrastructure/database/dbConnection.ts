import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

export default async()=>{
    try {        
        const mongoURL = process.env.MONGO_URL;
        console.log("🚀 ~ file: dbConnection.ts:9 ~ async ~ mongoURL:", mongoURL)
        if(!mongoURL){
            throw new Error("MongoDB connection string not provided...")
        }
        await mongoose.connect(mongoURL.trim())
        console.log("MongoDB Connection Successfully..");
        
    } catch (error:any) {
        console.log("MongoDB Connection failed...");
        console.error(error.message);
    }
}