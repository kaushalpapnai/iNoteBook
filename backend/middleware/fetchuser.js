const jwt = require("jsonwebtoken");
const JWT_SECRET = "kaushalpapnai$123";

const authenticate = (req, res, next) => {
    // Get the token from the header
    const authHeader = req.headers["authorization"];
    const bearer = authHeader.split(" ")
    const token = bearer[1]
    // If no token is provided, return a 401 error
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token." });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        // If the token is invalid, return a 401 error
        res.status(401).send({ error: "Invalid token. Please authenticate using a valid token." });
    }
};

module.exports = authenticate;
