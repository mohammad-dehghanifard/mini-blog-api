const {validationResult} = require("express-validator");

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

exports.createPost = (req, res, next) => {
    //validation
  const errors = validationResult(req); 

  if(!errors.isEmpty()){
        return res.status(422).json({
            message : "داده های ارسال شده نا معتبر میباشند!",
            Invalidatproperty : errors.array()[0].path,
            error : errors.array()[0]
        });
  }

  const title = req.body.title
  const content = req.body.content
  res.status(201).json({
    message: 'post created successfully',
    post: {
        _id: new Date().toString(),
      title: title,
      content: content,
      creator :{
        name : "mohammad"
    },
    createdAt: new Date(),
    image : 'images/img1.jpg'
    }
  });
}
