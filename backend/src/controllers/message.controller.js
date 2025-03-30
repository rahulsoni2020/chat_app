const User = require("./../model/user.model");
const Message = require("./../model/message.model");
const cloudinary = require('cloudinary');
const { getUserSocketId, io } = require("../../socket");

const getMessages = async (req,res) =>{
    try {
        const {id: senderId} = req.params;
        const {_id: userId} = req.user;
        const sender = await User.findOne({_id: senderId});
        if(!sender){
           return res.status(400).json({message: "user not available"});
        }
        const queryPar = {
           $or:[
            {senderId, receiverId:userId},
            {receiverId: senderId, senderId: userId}
           ]
        };
        const messages = await Message.find(queryPar).sort({_id: 1}).lean();
        return res.status(200).json({message: "massages retrieved", data: messages});

    } catch (error) {
        return res.status(500).json("internal server error!");
    }
}

const sendMessage = async (req, res) => {
    try {
      const { text, image } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;
  
      let imageUrl;
      if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }
  
      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        attachment: imageUrl,
      });
  
      await newMessage.save();
      const receiverSocketId = getUserSocketId(newMessage.receiverId);
      console.log(receiverSocketId)
      if(receiverSocketId){
        io.to(receiverSocketId).emit('newMessage',newMessage);
      }
      res.status(201).json({data:newMessage});
    } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

module.exports = {
    getMessages,
    sendMessage
}