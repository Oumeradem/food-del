import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://dessie:***REMOVED***@cluster0.qxqlnqo.mongodb.net/food-del').then(()=>console.log("DB Connected"));

}