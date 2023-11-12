const express =require('express')
const router = express.Router()
const Joi = require('joi')
const {Author} = require('../Models/Author')

const authors =[
    {
        id : 1 ,
        fiestName : "fethi",
        lastName : "medss",
        nationalty :"algeriane"
    },
    {
        id : 1 ,
        fiestName : "fethi",
        lastName : "medss",
        nationalty :"algeriane"
    },
    {
        id : 2 ,
        fiestName : "amine",
        lastName : "jdh",
        nationalty :"algeriane"
    },
    {
        id : 3 ,
        fiestName : "jak",
        lastName : "nbhg",
        nationalty :"tunsiane"
    },
    {
        id : 4 ,
        fiestName : "amir",
        lastName : "ben",
        nationalty :"marocane"
    }, 
]

/**
 * @desc get authors
 * @route /api/authors
 * @method GET
 * @access public
 */
router.get("/", async(req, res) => {
  try {
    const AutherList = await Author.find()
    res.status(200).json(AutherList);
  } catch (error) {
    console.log(error)
    res.status(500).json({message : "somthing went wrong "})
  }
  });
  

  /**
 * @desc get authors by id
 * @route /api/authors
 * @method GET
 * @access public
 */
router.get("/:id",async (req, res) => {
   try {
    const author = await Author.findById(req.params.id)
  
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: "author not found" });
    }
   } catch (error) {
    console.log(error)
    res.status(500).json({message:"somthing went wtong"})
   }
  });


 /**
 * @desc create new author
 * @route /api/authors
 * @method POST
 * @access public
 */
router.post("/",async (req, res) => {
    const { error } = ValidateCreateNewAuthore(req.body);
    if (error) {
      res.status(404).json({ message: error.details[0].message });
    }
  
   try {
    const author = Author ({
      
      fiestName: req.body.fiestName,
      lastName: req.body.lastName,
      nationalty: req.body.nationalty,
    });
    //save in Db
  const resulte = await author.save();

    res.status(201).json(resulte);

   } catch (error) {
    console.log(error)
    res.status(500).json({message : "somthing went  wrong"})
   } 
  });


/**
 * @desc Update author
 * @route /api/authors
 * @method PUT
 * @access public
 */

router.put("/:id", (req, res) => {

    const { error } = ValidateUpDateAuthor(req.body);
    if (error) {
      res.status(404).json({ message: error.details[0].message });
    }
const author = authors.find(b=>b.id === parseInt(req.params.id))
if (author) {
    res.status(200).json({message:"author has been Update"})
}
else{
    res.status(404).json({message:"author not found"})
}
});


/**
 * @desc Delete author
 * @route /api/authors
 * @method DELETE
 * @access public
 */

router.delete("/:id", (req, res) => {

   
    const author = authors.find(A=>A.id === parseInt(req.params.id))
    if (author) {
        res.status(200).json({message:"author has been deleted"})
    }
    else{
        res.status(404).json({message:"author not found"})
    }
    });




//function for validate create new authore 
  function ValidateCreateNewAuthore(obj) {
    //validate for req .body nothing is empty
    const schema = Joi.object({
    fiestName: Joi.string().trim().min(3).max(35).required(),
    lastName: Joi.string().trim().min(3).max(35).required(),
    nationalty: Joi.string().trim().min(3).max(50).required(),
    });
    return schema.validate(obj);
  }
  

//function for validate Update   authore 
  function ValidateUpDateAuthor(obj) {
   
   //validate for req .body nothing is empty
   const schema = Joi.object({
    fiestName: Joi.string().trim().min(3).max(35),
    lastName: Joi.string().trim().min(3).max(35),
    nationalty: Joi.string().trim().min(3).max(50),
    });
    return schema.validate(obj);
  }


module.exports =router