const express = require("express");
const bodyParser = require("body-parser");
const blogRoute = require("./routers/blog_api");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const authRoute = require("./routers/auth");
const socketIo = require("./utils/socket");

const app = express();

//image uploader
const storage = multer.diskStorage({
    //cb => call back
    destination: function(req, file, cb){
        //null => error
        cb(null,'images');
    },
    filename: function(req, file, cb){
        cb(null,file.fieldname+"-"+Date.now()+'.jpg');
    }
    
});

const fileFilter = function(req, file, cb){
    if(file.mimeType === 'image/png' || 'image/jpeg'){
        cb(null,true);
    }else{
        cb(new Error('file not supported'),false);
    }
}

const uploader = multer({
    storage: storage,
    fileFilter: fileFilter,
})

app.use(bodyParser.json()); // application/json
app.use("/images",express.static(path.join(__dirname,'images')));

// دادن مجوز های لازم برای ارسال درخواست از کلاینت های مختلف
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type , Authorization');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Type');
    next();
});
// Error Handler Middleware
app.use((err, req, res, next) => {
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    res.status(status).json({ message: message });
});
// file uploader Moddleware
app.use(uploader.single('image'));


app.use("/api",blogRoute);
app.use("/api",authRoute);


mongoose.connect("mongodb://127.0.0.1:27017/MiniBlog").then( ()=>{
    const server = app.listen(8080);
    const io = socketIo.init(server);
}).catch(err => {console.log("Error: ",err)})
