const jwt = require("jsonwebtoken")

// middleware para validar token
const checkToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({msg: "Access denied!"});
    }

    try{
        const verified = jwt.verify(token, "nossosecret");
        req.user = verified;
        next();
    } catch(error){
        res.status(400).json({msg: "Ivalid Token!"});
    }
};

module.exports = checkToken;
