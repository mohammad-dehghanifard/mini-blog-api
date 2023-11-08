const express = require('express');
const blogController = require("../controllers/blog_controller");
const {body} = require("express-validator");

const router = express.Router();

// دریافت تمام مقالات
router.get("/posts",blogController.getAllPost);
//ایجاد مقاله جدید
router.post("/add-post",[
    body("title").trim().isLength({min:5}),
    body("content").trim().isLength({min:5}),
],blogController.createPost);

router.get("post/:postId",blogController.getSinglePost)

module.exports = router;