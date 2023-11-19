const express = require("express");
const mongoos = require("mongoose");
const booksRouter = require("./Router/bookRouter");
const authorsRouter = require("./Router/authorsRouter");
const auth = require("./Router/auth");
const {logger}= require('./log/logger')
const { ErrorHendler, Notfound}= require('./log/Errors')
//config env
require('dotenv').config()


const port = 3000 || process.env.PORT;

//connection Db
mongoos
.connect(process.env.MONGO_URI)
.then(() => console.log("conncted To Mongo DB"))
.catch((error) => console.log("conncetion is failde ", error));



// Init App
const app = express();




//Apply Middlewares
app.use(express.json());

//loogers
app.use(logger)

//Routes
app.use("/api/books", booksRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/auth",auth)
//Eroore hanlder Middleware
app.use(Notfound)
app.use(ErrorHendler)

// runnunig server
app.listen(port, () => console.log(` server running in mdoe ${process.env.NODE_ENV} on port ${port}!`));
 