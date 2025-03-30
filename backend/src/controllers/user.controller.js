const User = require("../model/user.model");
const cloudinary  = require('./../libs/cloundinary');

const updateProfile = async(req, res) =>{
    try {
        const {imageUrl } = req.body;
        const { _id: id} = req.user;
        if(!imageUrl){
            return res.status(400).json({message: "invalid image!"});
        }
        const uploadResponse = await cloudinary.uploader.upload(imageUrl);
        const updObj = {
            imageUrl: uploadResponse.secure_url
        };
        const data = await User.findByIdAndUpdate({_id:id}, 
            updObj,
            { new: true });
        return res.status(201).json({message: "updated image", data});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "internal server error!"});
    }
};

const getUserList = async (req, res) =>{
    try {
        const {_id: id} = req.user;
        const queryArg = {
            _id: {$ne: id}
        };
        const users = await User.find(queryArg).lean();
        return res.status(200).json({users, message: "all user fetched"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "internal server error!"});
    }    
}

module.exports = {
    updateProfile,
    getUserList
};