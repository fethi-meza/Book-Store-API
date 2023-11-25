const express = require("express");
//const mongoos = require("mongoose");
const connectDB =require('./DB/DBM')
const booksRouter = require("./Router/bookRouter");
const authorsRouter = require("./Router/authorsRouter");
const auth = require("./Router/auth");
const User = require("./Router/users");
const {logger}= require('./middlewares/logger')
const { ErrorHendler, Notfound}= require('./middlewares/Errors')
//config env
require('dotenv').config({path :config.env})


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
app.use("/api/users",User)

//Eroore hanlder Middleware
app.use(Notfound)
app.use(ErrorHendler)

// runnunig server
app.listen(port, () => console.log(` server running in mdoe ${process.env.NODE_ENV} on port ${port}!`));
 