const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization')

  if (!authHeader) {
    const error = new Error('the authorization header field...')
    error.statusCode = 401
    throw error
  }

  // بخاطر وجود کلمه (Bearer) قبل از توکن باید جدا سازی انجام بشه
  const token = authHeader.split(' ')[1]
  let decodeToken
  try {
    decodeToken = jwt.verify(token,"MyprivateKey");
  } catch (error) {
    if(!error.statusCode){
        error.statusCode = 500;
    }
    throw error;
  }

  if(!decodeToken){
    const error = new Error("Invalide token...")
    error.statusCode = 401
    throw error
  }
  req.userId = decodeToken.userId;
  next();
}
