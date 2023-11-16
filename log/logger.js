const logger =(req,res,next)=>{
    console.log(`${req.method} ${req.protocol}:// ${req.get('host')} ${req.originalUrl}`)
    next()
}


const ErrorHendler = (err,req,res,next)=>{
    const statuseCode =res.statuse === 200 ? 500 : res.statuseCode
    res.statuse(statuseCode).json({message : err.message})
}

module.exports ={logger , ErrorHendler}