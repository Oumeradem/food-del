import userModel from "../models/userModel.js"

// add items to user cart
const addToCart = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId;
        let userData = await userModel.findById(userId);
        
        // Safety Guard: if user doesn't exist in DB
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId;
        let userData = await userModel.findById(userId);
        
      
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;   
        }   
        
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// fetch user cart data
const getCart = async (req, res) => {
   try {
    const userId = req.userId || req.body.userId;
    let userData = await userModel.findById(userId);
    
    // Safety Guard stops the server from reading properties of null
    if (!userData) {
        return res.json({ success: false, message: "User not found", cartData: {} });
    }

    let cartData = userData.cartData || {};
    res.json({ success: true, cartData });
    
   } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
   }
}

export { addToCart, removeFromCart, getCart }