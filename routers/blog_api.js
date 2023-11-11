const express = require('express');
const blogController = require("../controllers/blog_controller");
const {body} = require("express-validator");
const checkAuth = require("../middleware/check_auth");

const router = express.Router();

// دریافت تمام مقالات
router.get("/posts",checkAuth,blogController.getAllPost);
//ایجاد مقاله جدید
router.post("/add-post",checkAuth,[
    body("title").trim().isLength({min:5}),
    body("content").trim().isLength({min:5}),
],blogController.createPost);
//دریافت یک مقاله با ایدی
router.get("/post/:postId",checkAuth,blogController.getSinglePost);
//ویرایش پست ها
router.put("/edit-post/:postId",checkAuth,blogController.editPost)
// حذف پست
router.delete("/remove-post/:postId",checkAuth,blogController.deletePost);

module.exports = router;