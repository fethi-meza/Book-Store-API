const mongoos = require('mongoose')
const Joi = require('joi')

//User schema

const UserSchema = new mongoos.Schema({

email :{
    type : String ,
    required: true ,
    trim : true ,
    unique :true, 
    minlength : 5 ,
    maxlength : 100 
},
username :{
    type : String ,
    required: true ,
    trim : true , 
    minlength : 2 ,
    maxlength : 200 
} ,
password :{
    type : String ,
    required: true ,
    trim : true , 
    minlength : 8 
},
isAdmine :{
    type : Boolean ,
   default :false
},


} ,{timestamps:true})

//User model
const User = mongoos.model("User",UserSchema)


//Validate register User

function ValidateRegisterUser(obj){
const Schema =Joi.object({
    email :Joi.string().trim().unique().max(100).min(5).required().email() ,
    username :Joi.string().trim().max(200).min(2).required(),
    password :Joi.string().trim().min(8).required(),
    isAdmine : Joi.boolean()
});
return Schema.validate(obj)
}

//Validate Login User

function ValidateLoginUser(obj){
    const Schema =Joi.object({
        email :Joi.string().trim().unique().max(100).min(5).required().email() ,
        password :Joi.string().trim().min(8).required()
    });
    return Schema.validate(obj)
    }

//Validate Update User


function ValidateUpdateUser(obj){
    const Schema =Joi.object({
        email :Joi.string().trim().unique().max(100).min(5).email() ,
        username :Joi.string().trim().max(200).min(2),
        password :Joi.string().trim().min(8),
        isAdmine : Joi.boolean()
    });
    return Schema.validate(obj)
    }


module.exports ={User ,ValidateRegisterUser ,ValidateLoginUser , ValidateUpdateUser}