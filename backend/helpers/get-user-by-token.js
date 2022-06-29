const jwt = require("jsonwebtoken");

const User = require("../models/User");

const getUserByToken = async (token) => {
    if (!token) {
        return res.status(401).json({ error: "Acesso negado!" });
    }

    try{
        const decoded = jwt.verify(token, 'nossosecret')
    } catch(error){
        return res.status(400).json({msg: "Token inválido!"});
    }

    const decoded = jwt.verify(token, 'nossosecret')
    const userId = decoded.id;
    
    const user = await User.findOne({ _id: userId });

    return user;
}

module.exports = getUserByToken;