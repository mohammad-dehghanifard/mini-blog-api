const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routers/blog_api");

const app = express();

app.use(bodyParser.json()); // application/json

app.use("/api",routes);

// دادن مجوز های لازم برای ارسال درخواست از کلاینت های مختلف
app.use((req , res , next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATH");
    res.setHeader("Access-Control-Allow-Headers","Content-Type,Authorization");
    next();
});

app.listen(8080,() => {console.log("connected...")});