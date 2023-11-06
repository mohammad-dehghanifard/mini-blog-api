const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routers/blog_api");

const app = express();

app.use(bodyParser.json()); // application/json

app.use("/api",routes);

app.listen(8080);