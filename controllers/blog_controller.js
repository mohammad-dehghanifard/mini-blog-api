exports.getPosts = (req, res, next) => {
    res.status(200).json({
        'posts' : [
            {"title": "Hello", "description": "Hello welcome to the blog",}
        ],
    })
}

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;

    res.status(201).json({
       "message": "post created successfully",
       "data" : {
        "title" : title,
        "content" : content
       }
    })

}