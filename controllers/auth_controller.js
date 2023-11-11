const User = require('../models/user')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt');
const jwtwebtoken = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  try {
    // validation result
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).json({
        message: 'property validation failed',
        property: errors.array()[0].path
      })
    } else{
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
          });
          const result = await newUser.save();

          res.status(201).json({
            message : "user signup successful",
            user: result,
          })
    }

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.login = async (req, res, next) => {
    const bodyParams = {
        email : req.body.email,
        password : req.body.password
    };

    const user = await User.findOne({email : bodyParams.email});
    if(!user){
        res.status(404).json({
            message: 'user not found',
          })
    };

    const passwordEqual = await bcrypt.compare(bodyParams.password,user.password);
    if(!passwordEqual){
        res.status(422).json({
            message: 'password does not match',
          })
    }

    const token = jwtwebtoken.sign({email: bodyParams.email,userId:user._id.toString()},"MyprivateKey",{expiresIn : "1h"});

    res.status(200).json({
        message: "user logged in successfully",
        token: token,
        userId : user._id.toString(),
    })
}
