const express = require('express')
const router = express.Router()
const {User,ValidateLoginUser,ValidateRegisterUser}= require('../Models/User')


/**
 * @desc Register New User 
 * @route /api/Register
 * @method POST
 * @access public
 */
router.post('/register', async(req,res)=>{
try {
    const {error} = ValidateRegisterUser(req.body);
    if(error){
        res.status(500).json({message : error.details[0].message})
    }
let user = await User.findOne({email : req.body.email}); 
if(user){
res.status(400).json({message:"this user is Already Registered "})
}

 user = new User ({
  eamil :req.body.eamil ,
  username :req.body.username ,
  password :req.body.password ,
  isAdmine :req.body.isAdmine ,
 })

 const result = await user.save();
 res.status(201).json(result)
 
} catch (error) {
    console.log(error)
    res.status(500).json({message : "somthing went wrong ! "})
}
})





module.exports =router