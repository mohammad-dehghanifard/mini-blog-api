const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routers/blog_api");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(bodyParser.json()); // application/json
app.use("/images",express.static(path.join(__dirname,'images')));

// دادن مجوز های لازم برای ارسال درخواست از کلاینت های مختلف
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
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


app.use("/api",routes);


mongoose.connect("mongodb://127.0.0.1:27017/MiniBlog").then( ()=>{
    app.listen(8080,() => {console.log("connected...")});
}).catch(err => {console.log("Error: ",err)})
