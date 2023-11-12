const { string } = require('joi');
const mongoos = require('mongoose')



const AuthorsScheam = new mongoos.Schema({
    fiestName : {
        type: String,
        required:true ,
        trim:true ,
        minlength:3 ,
        maxlength:200
    },
    lastName : {
        type: String,
        required:true ,
        trim:true ,
        minlength:3 ,
        maxlength:200
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

module.exports ={Author}