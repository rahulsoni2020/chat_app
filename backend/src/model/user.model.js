const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true},
    name: {type: String, required: true},
    password: {type: String, require: true, minlength: 6},
    imageUrl: { type: String, default: ""}
},{timestamps: true});

module.exports = mongoose.model("User", UserSchema);