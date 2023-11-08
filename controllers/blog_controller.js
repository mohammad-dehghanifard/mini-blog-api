const { validationResult } = require('express-validator')
const Post = require('../models/post')

// دریافت تمام پست ها
exports.getAllPost = async (req, res, next) => {
  try {
    const postList = await Post.find()
    res.status(200).json({
      message: 'all post fetched',
      posts: postList
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
//ایجاد پست جدید
exports.createPost = async (req, res, next) => {
  try {
    // validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error('داده های ارسال شده نا معتبر میباشند!')
      error.statusCode = 422
      throw error
    }

    // create new post
    const post = new Post({
      titile: req.body.title,
      content: req.body.content,
      image: 'images/img1.jpg',
      creator: {
        name: 'mohammad'
      }
    })

    await post.save()

    res.status(201).json({
      message: 'post created successfully',
      post: post
    })
  } catch (err) {
    // در صورت نداشتن استاتوس کد یعنی اعتبار سنجی به درستی انجام شده اما کد های لاجیک به مشکل خوردن
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

// دریافت یک پست با ایدی
exports.getSinglePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId)
    console.log(post)
    if (!post) {
      const error = new Error('داده ای جهت نمایش یافت نشد');
      error.statusCode = 404;
      throw error;
    }else{
      res.status(200).json({ message: 'post featched', post: post });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
