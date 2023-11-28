const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')
const { User,ValidateUpdateUser}= require('../Models/User')
const { veryfiyTokenAndAuthourization , veryfiyTokenAndAdmin} = require('../middlewares/verfiyToken')




/**
 * @desc Update User :
 * @route /api/User/:id
 * @method PUT
 * @access private
 */
router.put("/:id", veryfiyTokenAndAuthourization, async(req,res)=>{
    try {
        
        const { error } = ValidateUpdateUser(req.body);
        if (error) {
          return res.status(400).json({success:false, message: error.details[0].message });
        }


        //if the user want change the password we need to hash pasword
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password ,salt )
        }
        // update user
     const UpdateUserById = await User.findByIdAndUpdate(req.params.id ,{
        $set: {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        }
     }, {new : true}).select('-password') ;
      res.status(200).json(UpdateUserById)


    } catch (error) {
        res.status(500).json({success:false, message: 'somthing went wrong !' })
    }
})



/**
 * @desc GET All  Users :
 * @route /api/User
 * @method GET
 * @access private(only Admin)
 */
router.get("/", veryfiyTokenAndAdmin, async(req,res)=>{
    try {
        //all information without password
       const users = await User.find().select('-password')

       res.status(200).json(users)
    

    } catch (error) {
        res.status(500).json({success:false, message: 'somthing went wrong !' })
    }
})


/**
 * @desc Dlelet  Users :
 * @route /api/User/:id
 * @method DELETE
 * @access private(only Admin and himslefe)
 */
router.delete("/", veryfiyTokenAndAuthourization , async(req,res)=>{
    try {
       
       const users = await User.findById(req.params.id).select('-password')

       if (users) {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({success: true, message : "the user is deleted"})
       }else{
        res.status(400).json({success: false, message : "user is not found"})
       }

       
    
       
    } catch (error) {
        res.status(500).json({success:false, message: 'somthing went wrong !' })
    }
})






module.exports = router