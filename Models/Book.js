const mongoos = require('mongoose')
const Joi = require('joi')


//Book schema 


const BookSchema = new mongoos.Schema({

    title:{
        type: String,
        required:true ,
        trim:true ,
        minlength:3 ,
        maxlength:30
    } ,
    author:{
        type: mongoos.Types.ObjectId, 
        required : true ,
        ref : "Author"
      
    },
    description:{
        type: String,
        required:true ,
        trim:true ,
        minlength:5 
    },
    price:{
        type: Number,
        required:true ,
        trim:true ,
         min : 0
    },
    cover:{
        type: String,
        required:true ,
        enum : ["soft", "hard"]
    },
},{
    timestamps :true
})

//Book model 

const Book = mongoos.model("Book",BookSchema)


//function for validate create new book
function ValidateCreateNewBook(obj) {
    //validate for req .body nothing is empty
    const schema = Joi.object({
      title: Joi.string().trim().min(3).max(30).required(),
      author: Joi.string().required(),
      description: Joi.string().trim().min(5).required(),
      price: Joi.number().min(0).required(),
      cover: Joi.string().valid("soft", "hard").required(),
    });
    return schema.validate(obj);
  }
  
  //function for validate  Update authore
  function ValidateUpDateBook(obj) {
    //validate for req .body nothing is empty
    const schema = Joi.object({
      title: Joi.string().trim().min(3).max(30),
      author: Joi.string(),
      description: Joi.string().trim().min(5),
      price: Joi.number().min(0),
      cover: Joi.string().valid("soft", "hard"),
    });
    return schema.validate(obj);
  }



















module.exports ={Book ,ValidateCreateNewBook , ValidateUpDateBook}