const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routers/blog_api");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json()); // application/json


// دادن مجوز های لازم برای ارسال درخواست از کلاینت های مختلف
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Type');
    next();
});

app.use("/api",routes);


mongoose.connect("mongodb://127.0.0.1:27017/MiniBlog").then( ()=>{
    app.listen(8080,() => {console.log("connected...")});
}).catch(err => {console.log("Error: ",err)})
