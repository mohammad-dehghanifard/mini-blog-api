const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {require:true,type: String},
    username : {require:true,type: String,unique: true},
    email : {require:true,type: String,unique: true},
    password : {require:true,type: String},
    status: {mdefault : "new user",type: String},
    posts : [
        {
            type : Schema.Types.ObjectId,
            ref : "Post"
        }
    ]
});

module.exports = mongoose.model("User",userSchema);