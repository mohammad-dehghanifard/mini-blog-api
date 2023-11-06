const express = require('express');
const blogController = require("../controllers/blog_controller");

const router = express.Router();

// دریافت تمام مقالات
router.get("/posts",blogController.getPosts);
//ایجاد مقاله جدید
router.post("/add-post",blogController.createPost);

module.exports = router;