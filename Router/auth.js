const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config({path :"./config.env"})
const {
  User,
  ValidateLoginUser,
  ValidateRegisterUser,
} = require("../Models/User");

/**
 * @desc Register New User
 * @route /api/auth/Register
 * @method POST
 * @access public
 */
router.post("/Register", async (req, res) => {
  try {
    const { error } = ValidateRegisterUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    //testing if this user eamil is ready existing(chek in bd)
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(400)
        .json({ success : true,message: "this user is Already Registered " });
    }

//hasch password
const salt = await bcrypt.genSalt(10)
req.body.password  =await bcrypt.hash(req.body.password ,salt)

    user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });

    const result = await user.save();

    //generate Token
    const token = generateToken();


// without the pasword for the result 
const {password ,...othre}=result._doc

//send the proporty only the pasword 
    res.status(201).json({...othre ,token});

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somthing went wrong ! " });
  }
});

/**
 * @desc login User
 * @route /api/auth/login
 * @method POST
 * @access public
 */
router.post("/Login", async (req, res) => {
  try {
    const { error } = ValidateLoginUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    //testing if this user eamil is ready existing(chek in bd)
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "invalid eamil or password" });
    }

//comparation beetwen  req.password and passsword in database
const isPaswordMatch = await bcrypt.compare(req.body.password , user.password) ;
//boolen return true or false
if (!isPaswordMatch) {
  return res.status(400).json({ message: "invalid eamil or password" });
}

const token = generateToken();


const {password ,...othre}=user._doc

    res.status(200).json({...othre ,token});

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somthing went wrong ! " });
  }
});

module.exports = router;
