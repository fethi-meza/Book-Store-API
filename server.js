const express = require("express");
//const mongoos = require("mongoose");
const connectDB =require('./DB/DBM')
const booksRouter = require("./Router/bookRouter");
const authorsRouter = require("./Router/authorsRouter");
const auth = require("./Router/auth");
const {logger}= require('./log/logger')
const { ErrorHendler, Notfound}= require('./log/Errors')
//config env
require('dotenv').config()


const port = 3000 || process.env.PORT;

//connection Db
connectDB();


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
 