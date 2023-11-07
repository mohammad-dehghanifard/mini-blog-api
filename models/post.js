const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    titile : {
        type : String,
        required : true,
    },
    content : {
        type : String,
        required : true,
    },
    creator : {
        type : Object,
        required: false,
    },
    image:{
        type : String,
        required: false,
    },
},
{
    timestamps : true,
}
);

module.exports = mongoose.model("Post",postSchema);