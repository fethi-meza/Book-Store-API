const express = require('express')
const router = express.Router()
const {User,ValidateLoginUser,ValidateRegisterUser}= require('../Models/User')


/**
 * @desc Register New User 
 * @route /api/auth/Register
 * @method POST
 * @access public
 */
router.post('/Register', async(req,res)=>{
try {
    const {error} = ValidateRegisterUser(req.body);
    if(error){
       return res.status(400).json({message : error.details[0].message})
    }

    //testing if this user eamil is ready existing(chek in bd)
let user = await User.findOne({email : req.body.email}); 

if(user){
 return res.status(400).json({message:"this user is Already Registered "})
}

 user = new User ({
    email :req.body.email ,
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