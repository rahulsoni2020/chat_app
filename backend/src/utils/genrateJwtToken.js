const jwt = require("jsonwebtoken");

const generateJwtToken = (res, userId) =>{
    const token = jwt.sign({id: userId}, process.env.JWT_TOKEN, {expiresIn:"1hr"});
    res.cookie("token", token, {
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "prod"
    });
    return token;
};

module.exports = generateJwtToken;