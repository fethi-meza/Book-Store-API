const Notfound = (err,req,res,next)=>{
    const error = new Error(` not found${req.originalUrl}`) 
    res.statuse(404);
    next(error)
}



const ErrorHendler = (err,req,res,next)=>{
    const statuseCode =res.statuse === 200 ? 500 : res.statuseCode
    res.statuse(statuseCode).json({message : err.message})
}

module.exports ={ ErrorHendler ,Notfound}