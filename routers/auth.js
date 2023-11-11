const express = require('express');
const {body} = require('express-validator');
const controller = require("../controllers/auth_controller");

const router = express.Router();

router.post("/singup",[
    body("name").trim().isLength({min:5,max : 30}).notEmpty(),
    body("username").trim().isLength({min:5,max : 30}).notEmpty(),
    body("email").trim().isLength({min:5}),
    body("password").trim().isLength({min:5}),
],controller.singup);