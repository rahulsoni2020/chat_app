const jwt = require('jsonwebtoken');
const User = require('./../model/user.model');

const authRequest = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message: 'unauthentic user!'});
        }
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const {id} = decoded;
        const user = await User.findOne({_id:id});
        if(!user){
            return res.status(401).json({message: 'invalid user'});
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server Error'});
    }
};

module.exports = authRequest;