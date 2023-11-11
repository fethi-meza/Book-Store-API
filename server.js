const express = require('express');


const booksRouter = require('./Router/bookRouter')
const authorsRouter = require('./Router/authorsRouter')
const port = 3000;
// Init App
const app = express();
//Apply middliwares
app.use(express.json())


//Routes
app.use('/api/books',booksRouter)
app.use('/api/authors',authorsRouter)

// runnunig server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
