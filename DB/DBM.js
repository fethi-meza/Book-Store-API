const mongoos = require("mongoose");
require('dotenv').config()


const connectDB =async ()=>{
    try {
        await  mongoos
        .connect(process.env.MONGO_URI)
        .then(() => console.log("conncted To Mongo DB"))
        
    } catch (error) {
        (error) => console.log("conncetion is failde ", error)
    }
}

module.exports =connectDB