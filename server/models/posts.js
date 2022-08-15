const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
    title: String,
    category:String,
    content:String,
    image:String,
    username:String,
    img_name:String,
    created:{
        type:Date,
        default:Date.now,
    },
});
module.exports = mongoose.model("Post",postSchema);