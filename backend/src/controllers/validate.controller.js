const User = require("../model/user.model");
const generateJwtToken = require("../utils/genrateJwtToken");
const bcrypt = require("bcryptjs");

const logoutUser = async(req,res)=>{
    try{
        res.cookie("token","", {
            maxAge: -1
        });
        return res.status(200).json({message: "user logout!"});
    }catch(error){
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }
};

const signupUser = async (req,res) =>{
    try {
        let {name, email, password, imageUrl} = req.body;
        let user = await User.findOne({email});
        console.log(user);
        if(user){
            return res.status(401).json({message: "user already exists!"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        user = new User({name, email, password: hashPassword, imageUrl});
        await user.save();
        generateJwtToken(res, user._id);
        delete user.password;
        return res.status(201).json({message: "user created!", data: user});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});    }
};

const loginUser = async(req,res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Invalid email/password"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: "Invalid email"});
        }
        const passMatch = await bcrypt.compare(password, user.password);
        if(!passMatch){
            return res.status(401).json({message: "Invalid password"});
        }
        generateJwtToken(res, user._id);
        delete user.password;
        return res.status(201).json({message: "successful", data: user});
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
};

const checkUser =async(req, res) =>{
    try {
        return res.status(200).json({message: "user authenticated!", data: req.user});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {
    loginUser,
    signupUser, 
    logoutUser,
    checkUser,
}
