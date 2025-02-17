const { verify_token } = require("../utils/authUtils");

const jwt_protection = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const user = await verify_token(token);
        req.user = user;
        next();
    } catch (e) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};


const admin_protection = async (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    next();
};

module.exports = { jwt_protection, admin_protection };
