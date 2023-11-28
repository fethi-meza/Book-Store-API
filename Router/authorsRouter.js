const express =require('express')
const router = express.Router()

const {Author ,ValidateCreateNewAuthore,ValidateUpDateAuthor} = require('../Models/Author')
const {veryfiyTokenAndAdmin}= require('../middlewares/verfiyToken')



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
 * @access private (only admin can do this )
 */
router.post("/",veryfiyTokenAndAdmin,async (req, res) => {
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
 * @access private (only admin can do this Update )
 */

router.put("/:id",veryfiyTokenAndAdmin,async (req, res) => {
// validation fo reqeourment what u want to upDate
    const { error } = ValidateUpDateAuthor(req.body);
    if (error) {
      res.status(404).json({ message: error.details[0].message });
    }
      
 try {

  const author = await Author.findByIdAndUpdate(req.params.id , {
    $set: {
      fiestName:req.body.fiestName,
      lastName:req.body.lastName ,
      nationalty :req.body.nationalty
    }
  } ,{new : true})
  res.status(200).json(author)
 } catch (error) {
  console.log(error)
  res.status(500).json({message : "somthing went wrong ! "})
 }

});


/**
 * @desc Delete author
 * @route /api/authors
 * @method DELETE
 * @access private (only admin can do this Update )
 */

router.delete("/:id",veryfiyTokenAndAdmin, async(req, res) => {

   try {
    const author = await Author.findById(req.params.id)
    if (author) {
      await Author.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"author has been deleted"})
    }
    else{
        res.status(404).json({message:"author not found"})
    }
   } catch (error) {

    console.log(error)
  res.status(500).json({message : "somthing went wrong ! "})
   }
   
    });

module.exports =router