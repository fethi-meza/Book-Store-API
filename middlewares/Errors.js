// const Notfound = (err,req,res,next)=>{
//     const error = new Error(` not found${req.originalUrl}`) 
//     res.status(404);
//     next(error)
// }
const  Notfound =(req, res, next)=> {
    res.status(404).json({ success: false, message: 'Not Found' });
}


// const ErrorHendler = (err,req,res,next)=>{
//     const statuseCode =res.statuse === 200 ? 500 : res.statuseCode
//     res.status(statuseCode).json({message : err.message})
//     //res.status(500).json({ success: false, message: 'Internal Server Error' });
// }

const  ErrorHendler =(err, req, res, next)=> {
    // Log the error for debugging purposes
    console.error(err.stack);

    // Send an appropriate response with a valid status code
    res.status(500).json({ success: false, message: 'Internal Server Error'  , message: err.message });
}


module.exports ={ ErrorHendler ,Notfound}