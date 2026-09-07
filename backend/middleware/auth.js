import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login Again" })
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET || '906532534952defdcc6ca2950d46462017f57ff4171802650465270be683dca2');
        req.userId = token_decode.id;
        next();

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }

}

export default authMiddleware;