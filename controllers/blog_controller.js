const {validationResult} = require("express-validator");
const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: new Date().toString(),
        title: 'Hello',
        description: 'Hello welcome to the blog',
        creator :{
            name : "mohammad"
        },
        createdAt: new Date(),
        image : 'images/img1.jpg'
      }
    ]
  })
}

exports.createPost = async (req, res, next) => {
  // validation
  const errors = validationResult(req); 

  if(!errors.isEmpty()){
        return res.status(422).json({
            message : "داده های ارسال شده نا معتبر میباشند!",
            Invalidatproperty : errors.array()[0].path,
            error : errors.array()[0]
        });
  }

  // create new post
  const post = new Post({
    titile : req.body.title,
    content : req.body.content,
    image : 'images/img1.jpg',
    creator : {
        name : "mohammad"
    }
  })

  await post.save();
  
  res.status(201).json({
    message: 'post created successfully',
    post: post
  });
}
