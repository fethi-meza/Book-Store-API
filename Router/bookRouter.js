const express = require("express");
const Joi = require("joi");
const router = express.Router();
const books = [
  {
    id: 1,
    title: "rechard o",
    author: "pahdb",
    description: "about balanck",
    price: 100,
    cover: "soft cover",
  },
  {
    id: 2,
    title: "rexcvc o",
    author: "vbcvbcv",
    description: "about balanck",
    price: 20,
    cover: "soft cover",
  },
  {
    id: 3,
    title: "threa",
    author: "hfjdjds",
    description: "about balanck",
    price: 320,
    cover: "soft cover",
  },
  {
    id: 4,
    title: "threa",
    author: "hfjdjds",
    description: "about balanck",
    price: 320,
    cover: "soft cover",
  },
  {
    id: 5,
    title: "threa",
    author: "hfjdjds",
    description: "about balanck",
    price: 320,
    cover: "soft cover",
  },
  {
    id: 6,
    title: "threa",
    author: "hfjdjds",
    description: "about balanck",
    price: 320,
    cover: "soft cover",
  },
];

/**
 * @desc get all books
 * @route /api/books
 * @method GET
 * @access public
 */
router.get("/", (req, res) => {
  res.status(200).json(books);
});

/**
 * @desc get books by id
 * @route /api/books
 * @method GET
 * @access public
 */
router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

/**
 * @desc create new book
 * @route /api/books
 * @method POST
 * @access public
 */
router.post("/", (req, res) => {
  const { error } = ValidateCreateNewBook(req.body);
  if (error) {
    res.status(404).json({ message: error.details[0].message });
  }

  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  };

  books.push(book);
  res.status(201).json(book); //201 create sucsufly new booke
});

/**
 * @desc Update book
 * @route /api/books
 * @method PUT
 * @access public
 */

router.put("/:id", (req, res) => {

    const { error } = ValidateUpDateBook(req.body);
    if (error) {
      res.status(404).json({ message: error.details[0].message });
    }
const book = books.find(b=>b.id === parseInt(req.params.id))
if (book) {
    res.status(200).json({message:"book has been Update"})
}
else{
    res.status(404).json({message:"book not found"})
}
});

/**
 * @desc Delete book
 * @route /api/books
 * @method PUT
 * @access public
 */

router.delete("/:id", (req, res) => {

   
const book = books.find(b=>b.id === parseInt(req.params.id))
if (book) {
    res.status(200).json({message:"book has been deleted"})
}
else{
    res.status(404).json({message:"book not found"})
}
});

//function for validate create new book
function ValidateCreateNewBook(obj) {
  //validate for req .body nothing is empty
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(30).required(),
    author: Joi.string().trim().min(3).max(30).required(),
    description: Joi.string().trim().min(3).max(500).required(),
    price: Joi.number().min(1).max(200).required(),
    cover: Joi.string().trim().required(),
  });
  return schema.validate(obj);
}

//function for validate  Update authore
function ValidateUpDateBook(obj) {
  //validate for req .body nothing is empty
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(30),
    author: Joi.string().trim().min(3).max(30),
    description: Joi.string().trim().min(3).max(500),
    price: Joi.number().min(1).max(200),
    cover: Joi.string().trim(),
  });
  return schema.validate(obj);
}

module.exports = router;
