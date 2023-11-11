const express = require("express");
const mongoos = require("mongoose");
const booksRouter = require("./Router/bookRouter");
const authorsRouter = require("./Router/authorsRouter");
const port = 3000;

mongoos
.connect("mongodb://127.0.0.1/BookStorDb")
.then(() => console.log("conncted To Mongo DB"))
.catch((error) => console.log("conncetion is failde ", error));



// Init App
const app = express();




//Apply middliwares
app.use(express.json());

//Routes
app.use("/api/books", booksRouter);
app.use("/api/authors", authorsRouter);

// runnunig server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
