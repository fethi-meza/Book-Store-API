const express = require("express");
const {Book ,ValidateCreateNewBook ,ValidateUpDateBook} = require('../Models/Book')
const router = express.Router();
const {veryfiyTokenAndAdmin}= require('../middlewares/verfiyToken')

/**
 * @desc get all books
 * @route /api/books
 * @method GET
 * @access public
 */
router.get("/", async(req, res) => {
  try {
    const Books = await Book.find().populate("author" ,["_id","fiestName" ,"lastName","nationalty"]);
    res.status(200).json(Books)
  } catch (error) {
    console.log(error)
    res.status(500).json({message :"somthing went wrong ! in server connction"})
  }
});

/**
 * @desc get books by id
 * @route /api/books
 * @method GET
 * @access public
 */
router.get("/:id", async(req, res) => {
  //will give all properoty
  const book = await Book.findById(req.params.id).populate("author")
try {
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({message: "Book not found" });
  }
} catch (error) {
  console.log(error)
    res.status(500).json({  message :"somthing went wrong"})
}
 
});

/**
 * @desc create new book
 * @route /api/books
 * @method POST
 * @access public
 */
router.post("/",veryfiyTokenAndAdmin, async(req, res) => {
  const { error } = ValidateCreateNewBook(req.body);
  if (error) {
    res.status(404).json({ message: error.details[0].message });
  }

 try {
  const book = new Book({

    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  });

  const result = await  book.save();
  res.status(201).json(result);
 } catch (error) {
  console.log(error)
  res.status(500).json({message :"somthing went wrong"})
 } 
});

/**
 * @desc Update book
 * @route /api/books
 * @method PUT
 * @access private (only admin can do this Update)
 */

router.put("/:id",veryfiyTokenAndAdmin, async (req, res) => {

    const { error } = ValidateUpDateBook(req.body);
    if (error) {
      res.status(404).json({ message: error.details[0].message });
    }

    try {

      const book = await Book.findByIdAndUpdate(req.params.id , {
        $set: {
          title : req.body.title,
          author : req.body.author,
          description : req.body.description,
          price : req.body.price,
          cover : req.body.cover,
        }
      } ,{new : true});
      res.status(200).json(book)
     } catch (error) {
      console.log(error)
      res.status(500).json({message : "somthing went wrong ! "})
     }
    
    



});

/**
 * @desc Delete book
 * @route /api/books
 * @method PUT
 * @access private (only admin can do this Delete)
 */

router.delete("/:id",veryfiyTokenAndAdmin, async(req, res) => {

   try {
    const book = Book.findById(req.params.id)
if (book) {
    await Book.findByIdAndDelete(req.params.id)
    res.status(200).json({message:"book has been deleted"})
}
else{
    res.status(404).json({message:"book not found"})
}
   } catch (error) {
    console.log(error)
    res.status(500).json({message : "somthinh went wrong !"})
   }

});



module.exports = router;
