import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// placing user order for frontend
const placeOrder = async (req, res) => {

   // const frontend_url = "https://food-del-frontend-8t0h.onrender.com";
   const frontend_url = "https://tomato-food-delivery-zeta.vercel.app";

    try {

        // Safe assignment
        const userId = req.userId || req.body.userId;

        const newOrder = new orderModel({
            userId: req.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        // await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        await userModel.findByIdAndUpdate(userId, { cartData: {} })


        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charge"
                },
                unit_amount: 2 * 100
            },
            quantity: 1
        })


        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }

}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" })

        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}

/*
// user orders for frontend
const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }

}

*/



/*

// users orders for frontend
const userOrders = async (req, res) => {
    try {
        const userId = req.userId || (req.body && req.body.userId);
        
        if (!userId) {
            return res.json({ success: false, message: "Authentication token or User ID missing" });
        }

        const orders = await orderModel.find({ userId:res.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("User Orders Error:", error);
        res.json({ success: false, message: "Error retrieving orders" });
    }
};


*/

// users orders for frontend
const userOrders = async (req, res) => {
    try {
        // Extracts the ID safely from middleware or request body
        const userId = req.userId || (req.body && req.body.userId);

        if (!userId) {
            return res.json({ success: false, message: "Authentication token or User ID missing" });
        }

        // EXACT FIX: Changed from res.body.userId to the clean userId variable
        const orders = await orderModel.find({ userId: userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("User Orders Error:", error);
        res.json({ success: false, message: "Error retrieving orders" });
    }
};


// Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}

// api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Update" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }

}


export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus }









