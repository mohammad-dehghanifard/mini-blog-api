const User = require('../models/user')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

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
