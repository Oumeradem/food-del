import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000

// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// TEMP DIAGNOSTIC: confirm which env vars are set at runtime (no secrets printed)
console.log("DIAG STRIPE_SECRET_KEY set:", !!process.env.STRIPE_SECRET_KEY, "len:", String(process.env.STRIPE_SECRET_KEY || "").length);
console.log("DIAG JWT_SECRET set:", !!process.env.JWT_SECRET, "len:", String(process.env.JWT_SECRET || "").length);
console.log("DIAG MONGODB_URI set:", !!process.env.MONGODB_URI);

// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})



