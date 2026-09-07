import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://dessie:***REMOVED***@cluster0.qxqlnqo.mongodb.net/food-del').then(()=>console.log("DB Connected"));

}