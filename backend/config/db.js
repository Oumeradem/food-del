import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://dessie:Addis3089@cluster0.qxqlnqo.mongodb.net/food-del').then(()=>console.log("DB Connected"));

}