const jwt = require('jsonwebtoken')
require('dotenv').config()

const verfiyToken =async(req,res,next)=>{
    const token = req.Header.token
    
    if (token) {
        try {
            
    const decoded = jwt.verify(token ,process.env.JWT_SECRET_KEY)
    req.user =decoded ;
    next();

        } catch (error) {
            res.status(401).json({success:false, message: 'invalid token  !'})
        }

    }else{
        res.status(401).json({success:false, message: 'no token provided !'})
    }
}

module.exports = {verfiyToken ,}