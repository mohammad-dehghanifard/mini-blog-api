const { validationResult } = require('express-validator');
const Post = require('../models/post');
const path = require("path");
const fs = require('fs');


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
    }else if(!req.file){
      const error = new Error('شما هیچ عکسی ارسال نکرده اید!')
      error.statusCode = 422
      throw error
    }

    // create new post
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      image: req.file.path,
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

// ویرایش پست ها
exports.editPost = async (req, res, next) => {

  // validation
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('داده های ارسال شده نا معتبر میباشند!')
    error.statusCode = 422
    throw error
  }

  // get values
  const postId = req.params.postId;
  const title = req.body.title;
  const content = req.body.content;
  let image = req.body.image;

  if(req.file){
    image = req.file.path;
  }


  const post = await Post.findById(postId);

  if(!post){
    const error = new Error("no post found...");
    error.statusCode = 404;
    throw error;
  }

  if(!image){
    image = post.image;
  }

  if(image !== post.image){
    await clearImage(post.image);
  }

  console.log(post.image)

  post.title = title;
  post.content = content;
  post.image = image;
  await post.save();
  console.log('then:',post.image)
  res.status(200).json(
    {
      message: "save edited post successfully",
      post : post,
    }
  )

}

// حذف پست ها
exports.deletePost = async (req, res, next) => {
  try{
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if(!post){
      const error = new Error("Post Not Found....");
      error.statusCode = 404;
      throw error;
    }
    await clearImage(post.image);
    const deletedPost = await Post.findOneAndDelete(post._id);
    res.status(200).json({
      message: "Post deleted...",
      post: deletedPost
    })
  } catch(err){
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }

}

async function clearImage(imagePath) {
  const filePath = path.join(__dirname,"..",imagePath);
  if( await fs.existsSync(filePath)){
    fs.unlinkSync(filePath,(err) => {
      throw err;
    });
  }
  console.log("clearing image");
}