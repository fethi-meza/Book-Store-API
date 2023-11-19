const express = require('express')
const router = express.Router()



/**
 * @desc Register New User 
 * @route /api/Register
 * @method POST
 * @access public
 */
router.post('/register', async(req,res)=>{

try {
    

} catch (error) {
    console.log(error)
    res.status(500).json({message : "somthing went wrong ! "})
}

})





module.exports =router