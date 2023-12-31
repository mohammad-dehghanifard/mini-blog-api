const express = require('express');
const {body} = require('express-validator');
const controller = require("../controllers/auth_controller");


const router = express.Router();

router.post("/signup",[
    body("name").trim().isLength({min:3,max : 30}).notEmpty(),
    body("email").trim().isLength({min:5}),
    body("password").trim().isLength({min:5}),
],controller.signup);


router.post("/login",controller.login);

module.exports = router;