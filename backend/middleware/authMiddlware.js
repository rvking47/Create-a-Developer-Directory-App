import jwt from "jsonwebtoken";

const authMiddlware = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(402).json({ message: "Authorization Error!!" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(402).json({ message: "Token Error!!" });
    }
    try {
        const decoded = jwt.verify(token, process.env.API_KEY);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
export default authMiddlware;
