const jwt = require('jsonwebtoken')
require('dotenv').config({path :'./config.env'})


// veryfiy Token
const verfiyToken =(req,res,next)=>{
    const token = req.headers.token
    
    if (token) {
        try {
            
    const decoded = jwt.verfiyToken(token , process.env.JWT_SECRET_KEY)
         req.user =decoded ;
         next();

        } catch (error) {
            res.status(401).json({success:false, message: 'invalid token  !'})
        }

    }else{
        res.status(401).json({success:false, message: 'no token provided !'})
    }
}

// veryiy token and authourize the user 
const  veryfiyTokenAndAuthourization  =(req,res,next)=>{
   // call this function for veryfiy the token
   verfiyToken(req,res,()=>{
        if ( req.user.id === req.params.id || req.user.isAdmine) {
           next();
        }else{
            return res.status(403)// forbidden 
            .json({success : false , message :'you are not allowed '})
        }
    });
}

// veryiy token and Admin  
const  veryfiyTokenAndAdmin  =(rq,res,next)=>{
    // call this function for veryfiy the token
     verfiyToken(req , res , ()=>{
         if (req.user.isAdmine) {
            next();
         }else{
             return res.status(403)// forbidden 
             .json({success : false , message :'you are not allowed , only admin can allowed  '})
         }
     });
 }



module.exports = {verfiyToken ,veryfiyTokenAndAuthourization ,veryfiyTokenAndAdmin}