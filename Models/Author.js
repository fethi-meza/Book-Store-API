const Joi = require('joi')
const mongoos = require('mongoose')



const AuthorsScheam = new mongoos.Schema({
    fiestName : {
        type: String,
        required:true ,
        trim:true ,
        minlength:3 ,
        maxlength:100
    },
    lastName : {
        type: String,
        required:true ,
        trim:true ,
        minlength:3 ,
        maxlength:100
    },
    nationalty : {
        type: String,
        required:true ,
        trim:true ,
        minlength:2 ,
        maxlength:100
    },

  
   

},{
    timestamps :true
});
const Author = mongoos.model("Author",AuthorsScheam)

//function for validate create new authore 
function ValidateCreateNewAuthore(obj) {
    //validate for req .body nothing is empty
    const schema = Joi.object({
    fiestName: Joi.string().trim().min(3).max(100).required(),
    lastName: Joi.string().trim().min(3).max(100).required(),
    nationalty: Joi.string().trim().min(2).max(100).required(),
    });
    return schema.validate(obj);
  }
  

//function for validate Update   authore 
  function ValidateUpDateAuthor(obj) {
   
   //validate for req .body nothing is empty
   const schema = Joi.object({
    fiestName: Joi.string().trim().min(3).max(100),
    lastName: Joi.string().trim().min(3).max(100),
    nationalty: Joi.string().trim().min(2).max(100),
    });
    return schema.validate(obj);
  }

module.exports ={Author ,ValidateCreateNewAuthore , ValidateUpDateAuthor}